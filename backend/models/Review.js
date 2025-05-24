const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    comment: {
      type: String,
      required: [true, "Review comment is required"],
      trim: true,
      minlength: [10, "Review must be at least 10 characters"],
      maxlength: [1000, "Review cannot exceed 1000 characters"],
    },
    isRecommended: {
      type: Boolean,
      default: true,
    },
    helpfulVotes: {
      type: Number,
      default: 0,
    },
    votedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Compound index to ensure one review per user per book
reviewSchema.index({ user: 1, book: 1 }, { unique: true })

// Index for querying reviews by book
reviewSchema.index({ book: 1, createdAt: -1 })
reviewSchema.index({ user: 1, createdAt: -1 })

// Post-save middleware to update book rating and user review count
reviewSchema.post("save", async function () {
  const Book = mongoose.model("Book")
  const User = mongoose.model("User")

  // Update book rating
  await Book.findById(this.book).then((book) => {
    if (book) book.updateRating()
  })

  // Update user review count
  await User.findById(this.user).then((user) => {
    if (user) user.updateReviewCount()
  })
})

// Post-remove middleware
reviewSchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    const Book = mongoose.model("Book")
    const User = mongoose.model("User")

    // Update book rating
    await Book.findById(doc.book).then((book) => {
      if (book) book.updateRating()
    })

    // Update user review count
    await User.findById(doc.user).then((user) => {
      if (user) user.updateReviewCount()
    })
  }
})

module.exports = mongoose.model("Review", reviewSchema)
