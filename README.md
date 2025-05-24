
# ReadSphere - Book Review Platform

ReadSphere is a modern, feature-rich book review platform built with Next.js and Express.js, enabling users to discover, review, and discuss their favorite books.

## Features

- User authentication and authorization
- Book discovery and search functionality
- Detailed book information and reviews
- User profiles and review management
- Responsive design with modern UI components
- AI-powered book recommendations

## Technology Stack

### Frontend
- Next.js with TypeScript
- Shadcn UI components
- TailwindCSS for styling
- Context API for state management

### Backend
- Express.js
- Node.js
- MongoDB with Mongoose
- JWT for authentication

## Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- npm or pnpm

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file with the following variables:
```plaintext
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Usage

1. Register a new account or login with existing credentials
2. Browse the book collection on the homepage
3. Search for specific books using the search bar
4. View detailed book information and reviews
5. Add your own reviews and ratings
6. Manage your profile and review history

## Project Structure

```plaintext
├── app/                 # Next.js pages and routing
├── backend/            # Express.js backend
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   └── middlewares/    # Custom middlewares
├── components/         # React components
├── contexts/          # React contexts
├── hooks/             # Custom React hooks
└── public/            # Static assets
```

## API Endpoints

- `/api/auth` - Authentication routes
- `/api/books` - Book management
- `/api/reviews` - Review operations
- `/api/users` - User management

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Create a Pull Request

### Code Style

- Follow the existing code style
- Use TypeScript for type safety
- Write meaningful commit messages
- Add appropriate documentation

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Shadcn UI for the component library
- Next.js team for the amazing framework
- MongoDB for the database solution
- All contributors who have helped shape this project
        