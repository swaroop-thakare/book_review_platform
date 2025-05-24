const express = require("express")
const { body, query, validationResult } = require("express-validator")
const User = require("../models/User")
const Review = require("../models/Review")
const auth = require("../middlewares/auth")
const asyncHandler = require("../utils/asyncHandler")

const router = express.Router()

// @route   GET /api/users/:id
// @desc    Get user profile
// @access  Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password").lean()

    if (!user || !user.isActive) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Get user's recent reviews
    const recentReviews = await Review.find({
      user: req.params.id,
      isActive: true,
    })
      .populate("book", "title author coverImage averageRating")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean()

    res.json({
      success: true,
      data: {
        user: {
          ...user,
          recentReviews,
        },
      },
    })
  }),
)

// @route   PUT /api/users/:id
// @desc    Update user profile
// @access  Private (User can only update their own profile)
router.put(
  "/:id",
  auth,
  [
    body("name")
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("Name must be between 2 and 50 characters"),
    body("bio").optional().trim().isLength({ max: 500 }).withMessage("Bio cannot exceed 500 characters"),
    body("avatar").optional().isURL().withMessage("Avatar must be a valid URL"),
    body("favoriteGenres").optional().isArray().withMessage("Favorite genres must be an array"),
    body("favoriteGenres.*")
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

    // Check if user is updating their own profile
    if (req.params.id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this profile",
      })
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select(
      "-password",
    )

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: { user },
    })
  }),
)

// @route   GET /api/users/:id/reviews
// @desc    Get user's reviews
// @access  Public
router.get(
  "/:id/reviews",
  [
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

    const reviews = await Review.find({
      user: req.params.id,
      isActive: true,
    })
      .populate("book", "title author coverImage averageRating")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    const total = await Review.countDocuments({
      user: req.params.id,
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

// @route   GET /api/users/:id/stats
// @desc    Get user statistics
// @access  Public
router.get(
  "/:id/stats",
  asyncHandler(async (req, res) => {
    const userId = req.params.id

    // Get user
    const user = await User.findById(userId).select("reviewCount booksRead")
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Get review statistics
    const reviewStats = await Review.aggregate([
      { $match: { user: user._id, isActive: true } },
      {
        $group: {
          _id: null,
          totalReviews: { $sum: 1 },
          averageRating: { $avg: "$rating" },
          ratingsDistribution: {
            $push: "$rating",
          },
        },
      },
    ])

    // Calculate ratings distribution
    const ratingsDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    if (reviewStats.length > 0) {
      reviewStats[0].ratingsDistribution.forEach((rating) => {
        ratingsDistribution[rating]++
      })
    }

    // Get favorite genres from reviews
    const genreStats = await Review.aggregate([
      { $match: { user: user._id, isActive: true } },
      {
        $lookup: {
          from: "books",
          localField: "book",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      { $unwind: "$bookInfo" },
      { $unwind: "$bookInfo.genres" },
      {
        $group: {
          _id: "$bookInfo.genres",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ])

    res.json({
      success: true,
      data: {
        stats: {
          totalReviews: reviewStats.length > 0 ? reviewStats[0].totalReviews : 0,
          averageRating: reviewStats.length > 0 ? Math.round(reviewStats[0].averageRating * 10) / 10 : 0,
          booksRead: user.booksRead,
          ratingsDistribution,
          topGenres: genreStats.map((genre) => ({
            name: genre._id,
            count: genre.count,
          })),
        },
      },
    })
  }),
)

module.exports = router
