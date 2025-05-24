const express = require("express")
const { body, query, validationResult } = require("express-validator")
const Book = require("../models/Book")
const Review = require("../models/Review")
const auth = require("../middlewares/auth")
const admin = require("../middlewares/admin")
const asyncHandler = require("../utils/asyncHandler")

const router = express.Router()

// @route   GET /api/books
// @desc    Get all books with pagination, search, and filters
// @access  Public
router.get(
  "/",
  [
    query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
    query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100"),
    query("search").optional().isLength({ max: 100 }).withMessage("Search term too long"),
    query("genre")
      .optional()
      .isIn([
        "Fiction",
        "Non-Fiction",
        "Mystery",
        "Romance",
        "Sci-Fi",
        "Fantasy",
        "Biography",
        "History",
        "Self-Help",
        "Business",
        "Manga",
        "Comics",
      ])
      .withMessage("Invalid genre"),
    query("sortBy")
      .optional()
      .isIn(["title", "author", "averageRating", "reviewCount", "createdAt"])
      .withMessage("Invalid sort field"),
    query("sortOrder").optional().isIn(["asc", "desc"]).withMessage("Sort order must be asc or desc"),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      })
    }

    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 12
    const skip = (page - 1) * limit
    const search = req.query.search
    const genre = req.query.genre
    const sortBy = req.query.sortBy || "createdAt"
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1

    // Build query
    const query = { isActive: true }

    // Search functionality
    if (search) {
      query.$text = { $search: search }
    }

    // Genre filter
    if (genre) {
      query.genres = genre
    }

    // Build sort object
    const sort = {}
    sort[sortBy] = sortOrder

    // Execute query
    const books = await Book.find(query).populate("addedBy", "name").sort(sort).skip(skip).limit(limit).lean()

    // Get total count for pagination
    const total = await Book.countDocuments(query)
    const totalPages = Math.ceil(total / limit)

    res.json({
      success: true,
      data: {
        books,
        pagination: {
          currentPage: page,
          totalPages,
          totalBooks: total,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
    })
  }),
)

// @route   GET /api/books/:id
// @desc    Get single book with reviews
// @access  Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id).populate("addedBy", "name avatar").lean()

    if (!book || !book.isActive) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      })
    }

    // Get recent reviews
    const reviews = await Review.find({ book: req.params.id, isActive: true })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()

    res.json({
      success: true,
      data: {
        book: {
          ...book,
          reviews,
        },
      },
    })
  }),
)

// @route   POST /api/books
// @desc    Create a new book
// @access  Private (Admin only)
router.post(
  "/",
  [auth, admin],
  [
    body("title")
      .trim()
      .isLength({ min: 1, max: 200 })
      .withMessage("Title is required and must be less than 200 characters"),
    body("author")
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage("Author is required and must be less than 100 characters"),
    body("description")
      .trim()
      .isLength({ min: 10, max: 2000 })
      .withMessage("Description must be between 10 and 2000 characters"),
    body("genres").isArray({ min: 1 }).withMessage("At least one genre is required"),
    body("publishedDate").isISO8601().withMessage("Valid published date is required"),
    body("isbn")
      .optional()
      .matches(/^(?:\d{9}[\dX]|\d{13})$/)
      .withMessage("Invalid ISBN format"),
    body("pageCount").optional().isInt({ min: 1 }).withMessage("Page count must be a positive integer"),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      })
    }

    // Check if book with same title and author already exists
    const existingBook = await Book.findOne({
      title: req.body.title,
      author: req.body.author,
    })

    if (existingBook) {
      return res.status(400).json({
        success: false,
        message: "Book with this title and author already exists",
      })
    }

    const book = await Book.create({
      ...req.body,
      addedBy: req.user.id,
    })

    await book.populate("addedBy", "name")

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: { book },
    })
  }),
)

// @route   PUT /api/books/:id
// @desc    Update a book
// @access  Private (Admin only)
router.put(
  "/:id",
  [auth, admin],
  [
    body("title")
      .optional()
      .trim()
      .isLength({ min: 1, max: 200 })
      .withMessage("Title must be less than 200 characters"),
    body("author")
      .optional()
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage("Author must be less than 100 characters"),
    body("description")
      .optional()
      .trim()
      .isLength({ min: 10, max: 2000 })
      .withMessage("Description must be between 10 and 2000 characters"),
    body("genres").optional().isArray({ min: 1 }).withMessage("At least one genre is required"),
    body("publishedDate").optional().isISO8601().withMessage("Valid published date is required"),
    body("pageCount").optional().isInt({ min: 1 }).withMessage("Page count must be a positive integer"),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      })
    }

    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate(
      "addedBy",
      "name",
    )

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      })
    }

    res.json({
      success: true,
      message: "Book updated successfully",
      data: { book },
    })
  }),
)

// @route   DELETE /api/books/:id
// @desc    Delete a book (soft delete)
// @access  Private (Admin only)
router.delete(
  "/:id",
  [auth, admin],
  asyncHandler(async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true })

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      })
    }

    res.json({
      success: true,
      message: "Book deleted successfully",
    })
  }),
)

// @route   GET /api/books/:id/reviews
// @desc    Get all reviews for a book
// @access  Public
router.get(
  "/:id/reviews",
  [
    query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
    query("limit").optional().isInt({ min: 1, max: 50 }).withMessage("Limit must be between 1 and 50"),
  ],
  asyncHandler(async (req, res) => {
    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const reviews = await Review.find({
      book: req.params.id,
      isActive: true,
    })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    const total = await Review.countDocuments({
      book: req.params.id,
      isActive: true,
    })

    res.json({
      success: true,
      data: {
        reviews,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalReviews: total,
        },
      },
    })
  }),
)

module.exports = router
