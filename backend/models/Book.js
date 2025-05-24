const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
      maxlength: [100, "Author name cannot exceed 100 characters"],
    },
    isbn: {
      type: String,
      unique: true,
      sparse: true,
      match: [/^(?:\d{9}[\dX]|\d{13})$/, "Please enter a valid ISBN"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    genres: [
      {
        type: String,
        required: true,
        enum: [
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
        ],
      },
    ],
    coverImage: {
      type: String,
      default: "/placeholder.svg?height=400&width=300",
    },
    publishedDate: {
      type: Date,
      required: [true, "Published date is required"],
    },
    publisher: {
      type: String,
      trim: true,
      maxlength: [100, "Publisher name cannot exceed 100 characters"],
    },
    pageCount: {
      type: Number,
      min: [1, "Page count must be at least 1"],
    },
    language: {
      type: String,
      default: "English",
      maxlength: [50, "Language cannot exceed 50 characters"],
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Virtual for book's reviews
bookSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "book",
})

// Index for search functionality
bookSchema.index({
  title: "text",
  author: "text",
  description: "text",
  tags: "text",
})

bookSchema.index({ genres: 1 })
bookSchema.index({ averageRating: -1 })
bookSchema.index({ createdAt: -1 })

// Update average rating and review count
bookSchema.methods.updateRating = async function () {
  const Review = mongoose.model("Review")

  const stats = await Review.aggregate([
    { $match: { book: this._id } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        reviewCount: { $sum: 1 },
      },
    },
  ])

  if (stats.length > 0) {
    this.averageRating = Math.round(stats[0].averageRating * 10) / 10
    this.reviewCount = stats[0].reviewCount
  } else {
    this.averageRating = 0
    this.reviewCount = 0
  }

  return this.save()
}

module.exports = mongoose.model("Book", bookSchema)
