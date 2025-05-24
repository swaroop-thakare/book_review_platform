const express = require("express")
const { body, query, validationResult } = require("express-validator")
const Review = require("../models/Review")
const Book = require("../models/Book")
const auth = require("../middlewares/auth")
const asyncHandler = require("../utils/asyncHandler")

const router = express.Router()

// @route   GET /api/reviews
// @desc    Get reviews with filters
// @access  Public
router.get(
  "/",
  [
    query("bookId").optional().isMongoId().withMessage("Invalid book ID"),
    query("userId").optional().isMongoId().withMessage("Invalid user ID"),
    query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
    query("limit").optional().isInt({ min: 1, max: 50 }).withMessage("Limit must be between 1 and 50"),
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
    const limit = Number.parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    // Build query
    const query = { isActive: true }

    if (req.query.bookId) {
      query.book = req.query.bookId
    }

    if (req.query.userId) {
      query.user = req.query.userId
    }

    const reviews = await Review.find(query)
      .populate("user", "name avatar")
      .populate("book", "title author coverImage")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    const total = await Review.countDocuments(query)

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

// @route   GET /api/reviews/:id
// @desc    Get single review
// @access  Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id)
      .populate("user", "name avatar bio")
      .populate("book", "title author coverImage")
      .lean()

    if (!review || !review.isActive) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      })
    }

    res.json({
      success: true,
      data: { review },
    })
  }),
)

// @route   POST /api/reviews
// @desc    Create a new review
// @access  Private
router.post(
  "/",
  auth,
  [
    body("book").isMongoId().withMessage("Valid book ID is required"),
    body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
    body("comment")
      .trim()
      .isLength({ min: 10, max: 1000 })
      .withMessage("Comment must be between 10 and 1000 characters"),
    body("isRecommended").optional().isBoolean().withMessage("isRecommended must be a boolean"),
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

    const { book: bookId, rating, comment, isRecommended } = req.body

    // Check if book exists
    const book = await Book.findById(bookId)
    if (!book || !book.isActive) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      })
    }

    // Check if user already reviewed this book
    const existingReview = await Review.findOne({
      user: req.user.id,
      book: bookId,
    })

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this book",
      })
    }

    // Create review
    const review = await Review.create({
      user: req.user.id,
      book: bookId,
      rating,
      comment,
      isRecommended: isRecommended !== undefined ? isRecommended : true,
    })

    await review.populate([
      { path: "user", select: "name avatar" },
      { path: "book", select: "title author coverImage" },
    ])

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: { review },
    })
  }),
)

// @route   PUT /api/reviews/:id
// @desc    Update a review
// @access  Private (Review owner only)
router.put(
  "/:id",
  auth,
  [
    body("rating").optional().isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
    body("comment")
      .optional()
      .trim()
      .isLength({ min: 10, max: 1000 })
      .withMessage("Comment must be between 10 and 1000 characters"),
    body("isRecommended").optional().isBoolean().withMessage("isRecommended must be a boolean"),
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

    const review = await Review.findById(req.params.id)

    if (!review || !review.isActive) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      })
    }

    // Check if user owns the review
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this review",
      })
    }

    // Update review
    Object.assign(review, req.body)
    await review.save()

    await review.populate([
      { path: "user", select: "name avatar" },
      { path: "book", select: "title author coverImage" },
    ])

    res.json({
      success: true,
      message: "Review updated successfully",
      data: { review },
    })
  }),
)

// @route   DELETE /api/reviews/:id
// @desc    Delete a review
// @access  Private (Review owner only)
router.delete(
  "/:id",
  auth,
  asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id)

    if (!review || !review.isActive) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      })
    }

    // Check if user owns the review
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this review",
      })
    }

    // Soft delete
    review.isActive = false
    await review.save()

    res.json({
      success: true,
      message: "Review deleted successfully",
    })
  }),
)

// @route   POST /api/reviews/:id/helpful
// @desc    Mark review as helpful
// @access  Private
router.post(
  "/:id/helpful",
  auth,
  asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id)

    if (!review || !review.isActive) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      })
    }

    // Check if user already voted
    if (review.votedBy.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: "You have already voted on this review",
      })
    }

    // Add vote
    review.votedBy.push(req.user.id)
    review.helpfulVotes += 1
    await review.save()

    res.json({
      success: true,
      message: "Vote recorded successfully",
      data: {
        helpfulVotes: review.helpfulVotes,
      },
    })
  }),
)

module.exports = router
