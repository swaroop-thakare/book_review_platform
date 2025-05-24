const mongoose = require("mongoose")
const dotenv = require("dotenv")
const User = require("../models/User")
const Book = require("../models/Book")
const Review = require("../models/Review")

dotenv.config()

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to MongoDB")

    // Clear existing data
    await User.deleteMany({})
    await Book.deleteMany({})
    await Review.deleteMany({})
    console.log("Cleared existing data")

    // Create admin user
    const adminUser = await User.create({
      name: process.env.ADMIN_NAME || "ReadSphere Admin",
      email: process.env.ADMIN_EMAIL || "admin@readsphere.com",
      password: process.env.ADMIN_PASSWORD || "admin123456",
      isAdmin: true,
      bio: "Platform administrator and book enthusiast",
    })

    // Create sample users
    const users = await User.create([
      {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        bio: "Avid reader and technology enthusiast",
        favoriteGenres: ["Sci-Fi", "Fantasy", "Business"],
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: "password123",
        bio: "Literature professor and book critic",
        favoriteGenres: ["Fiction", "Biography", "History"],
      },
      {
        name: "Mike Johnson",
        email: "mike@example.com",
        password: "password123",
        bio: "Manga collector and anime fan",
        favoriteGenres: ["Manga", "Comics", "Fantasy"],
      },
    ])

    // Create sample books
    const books = await Book.create([
      {
        title: "The Pragmatic Programmer",
        author: "David Thomas, Andrew Hunt",
        description: "Your journey to mastery in software development",
        genres: ["Business", "Self-Help"],
        publishedDate: "1999-10-20",
        publisher: "Addison-Wesley",
        pageCount: 352,
        coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
        addedBy: adminUser._id,
      },
      {
        title: "Dune",
        author: "Frank Herbert",
        description: "A science fiction masterpiece set on the desert planet Arrakis",
        genres: ["Sci-Fi", "Fantasy"],
        publishedDate: "1965-08-01",
        publisher: "Chilton Books",
        pageCount: 688,
        coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
        addedBy: adminUser._id,
      },
      {
        title: "One Piece Volume 1",
        author: "Eiichiro Oda",
        description: "The beginning of the greatest pirate adventure",
        genres: ["Manga", "Fantasy"],
        publishedDate: "1997-12-24",
        publisher: "Shueisha",
        pageCount: 200,
        coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
        addedBy: adminUser._id,
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        description: "A gripping tale of racial injustice and childhood innocence",
        genres: ["Fiction", "History"],
        publishedDate: "1960-07-11",
        publisher: "J.B. Lippincott & Co.",
        pageCount: 376,
        coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
        addedBy: adminUser._id,
      },
    ])

    // Create sample reviews
    const reviews = await Review.create([
      {
        user: users[0]._id,
        book: books[0]._id,
        rating: 5,
        comment:
          "Excellent book for any programmer. The principles are timeless and applicable regardless of the technology stack.",
        isRecommended: true,
      },
      {
        user: users[1]._id,
        book: books[0]._id,
        rating: 4,
        comment:
          "Great insights into software development practices. Some concepts might be dated but core principles remain solid.",
        isRecommended: true,
      },
      {
        user: users[0]._id,
        book: books[1]._id,
        rating: 5,
        comment:
          "Herbert created an incredibly detailed universe. The world-building is phenomenal and the story is captivating.",
        isRecommended: true,
      },
      {
        user: users[2]._id,
        book: books[2]._id,
        rating: 5,
        comment:
          "The start of an amazing journey! Oda's art style and storytelling are incredible from the very beginning.",
        isRecommended: true,
      },
      {
        user: users[1]._id,
        book: books[3]._id,
        rating: 5,
        comment: "A timeless classic that addresses important social issues with grace and powerful storytelling.",
        isRecommended: true,
      },
    ])

    console.log("✅ Sample data created successfully!")
    console.log(`👤 Admin User: ${adminUser.email} (password: ${process.env.ADMIN_PASSWORD})`)
    console.log(`📚 Created ${books.length} books`)
    console.log(`👥 Created ${users.length + 1} users`)
    console.log(`⭐ Created ${reviews.length} reviews`)

    process.exit(0)
  } catch (error) {
    console.error("❌ Error seeding data:", error)
    process.exit(1)
  }
}

seedData()
