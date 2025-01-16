# 🧠 Second Brain - Your Digital Knowledge Hub v1.0

Second Brain is a web application that helps you organize and manage your digital content in one place. Save and categorize your YouTube videos, tweets, documents, and links with tags for easy retrieval. Think of it as your personal digital library! 🚀

## 🌟 Features

- 📝 Save and organize different types of content:
  - YouTube videos
  - Tweets
  - Documents
  - Web links
- 🏷️ Add custom tags to categorize your content
- 🔍 Filter content by type (All, YouTube, Tweet, Document)
- 🔄 Real-time content updates
- 🔐 Secure user authentication
- 🔗 Share your brain with others (collection of saved content)

## 🛠️ Tech Stack

- Frontend:
  - React 18 with TypeScript
  - Tailwind CSS for styling
  - Axios for API calls
  - React Router for navigation

- Backend:
  - Node.js with Express
  - TypeScript
  - MongoDB with Mongoose
  - Zod for validation
  - JWT for authentication
  - Bcrypt for password hashing

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB installed locally or a MongoDB Atlas account
- Git

### Installation Steps

1. Clone the repository
```bash
git clone https://github.com/yourusername/second-brain.git
cd second-brain
```

2. Set up environment variables
```bash
# Backend (.env)
DB_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
```

3. Install dependencies and start backend
```bash
cd backend
npm install
npm run dev
```

4. Install dependencies and start frontend
```bash
cd frontend
npm install
npm run dev
```

5. Access the application at `http://localhost:5173`

## 🐛 Known Issues

1. Share Brain Link Issue:
   - Current implementation uses relative URLs which can break in production
   - Fix: Update `Front_URL` in `FrontEndUrl.tsx` to use environment variables
   ```typescript
   export const Front_URL = import.meta.env.VITE_FRONTEND_URL;
   ```

2. Content Loading State:
   - Loading states could be improved with better user feedback
   - Add loading skeletons for better UX

## 🚀 Future Improvements

1. Features:
   - Full-text search functionality
   - Content organization with folders/collections
   - Rich text editor for documents
   - Collaborative sharing features
   - Mobile responsive design improvements
   - OAuth integration (Google, GitHub)

2. Technical:
   - Add unit and integration tests
   - Implement error boundaries
   - Add TypeScript strict mode
   - Implement proper state management (Redux/Zustand)
   - Add rate limiting
   - Implement caching
   - Add pagination for content

3. UI/UX:
   - Dark mode support
   - Customizable themes
   - Drag and drop content organization
   - Better mobile navigation
   - Improved tag management

## 🤝 Contributing

We welcome contributions! Feel free to:

1. Fork the repository
2. Create a feature branch
```bash
git checkout -b feature/AmazingFeature
```
3. Commit your changes
```bash
git commit -m 'Add some AmazingFeature'
```
4. Push to the branch
```bash
git push origin feature/AmazingFeature
```
5. Open a Pull Request

## 📝 Project Structure

```
backend/
├── config.ts        # Configuration variables
├── db.ts           # Database connection and models
├── index.ts        # Entry point
├── middleware.ts   # Auth middleware
└── routes/
    └── index.ts    # API routes

frontend/
├── App.tsx         # Main app component
├── components/     # React components
│   ├── ui/        # UI components
│   ├── Body.tsx   # Main dashboard
│   └── ...
└── ...
```

⭐️ If you find this project useful, please consider giving it a star!
