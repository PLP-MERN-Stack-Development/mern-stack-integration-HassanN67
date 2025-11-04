MERN Stack Blog Application
A full-stack blog application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring a modern, responsive design and complete CRUD functionality.

🚀 Features
Backend Features
RESTful API with proper HTTP status codes

MongoDB with Mongoose ODM

Express.js server with middleware configuration

CORS enabled for cross-origin requests

Environment variables configuration

Error handling middleware

Input validation and sanitization

Pagination and filtering

Search functionality across posts

Frontend Features
React 18 with functional components and hooks

React Router for navigation

Responsive design for all devices

Modern UI with smooth animations

Custom hooks for API calls and state management

Form validation and error handling

Loading states and user feedback

Search and filter functionality

Pagination for better performance

Blog Features
📝 Create, read, update, and delete blog posts

🔍 Search posts by title and content

🏷️ Categorize posts and add tags

👁️ Track post view counts

📱 Fully responsive design

⚡ Fast and optimized performance

🛠️ Tech Stack
Frontend
React - UI library

React Router DOM - Routing

Axios - HTTP client

Vite - Build tool and dev server

CSS3 - Styling with modern features

Backend
Node.js - Runtime environment

Express.js - Web framework

MongoDB - Database

Mongoose - ODM for MongoDB

CORS - Cross-origin resource sharing

dotenv - Environment variables

📦 Installation
Prerequisites
Node.js (v18 or higher)

MongoDB (local installation or MongoDB Atlas)

npm or yarn

1. Clone the Repository
bash
git clone <your-repository-url>
cd mern-blog-app
2. Backend Setup
bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
Edit the .env file:

env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-blog
NODE_ENV=development
CLIENT_URL=http://localhost:3000
3. Frontend Setup
bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Create environment file
cp .env.example .env
Edit the .env file:

env
VITE_API_BASE_URL=http://localhost:5000/api
4. Database Setup
Make sure MongoDB is running on your system:

bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas connection string in your .env file
5. Run the Application
Start the Backend Server
bash
cd server
npm run dev
Server will run on http://localhost:5000

Start the Frontend Development Server
bash
cd client
npm run dev
Client will run on http://localhost:3000

🎯 API Endpoints
Posts
Method	Endpoint	Description
GET	/api/posts	Get all posts with pagination
GET	/api/posts/:id	Get single post by ID
POST	/api/posts	Create new post
PUT	/api/posts/:id	Update post by ID
DELETE	/api/posts/:id	Delete post by ID
Categories
Method	Endpoint	Description
GET	/api/categories	Get all categories
POST	/api/categories	Create new category
Health Check
Method	Endpoint	Description
GET	/api/health	Server health status
GET	/api	API documentation
Query Parameters for Posts
page - Page number (default: 1)

limit - Posts per page (default: 10)

search - Search term for title/content

category - Filter by category

status - Filter by status (published/draft)

📁 Project Structure
text
mern-blog-app/
├── server/
│   ├── models/
│   │   ├── Post.js
│   │   └── Category.js
│   ├── routes/
│   │   ├── posts.js
│   │   └── categories.js
│   ├── .env
│   └── server.js
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   ├── Post/
│   │   │   └── UI/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── public/
│   └── package.json
└── README.md
🎨 Component Overview
Layout Components
Layout - Main layout wrapper

Header - Navigation header with logo and menu

Footer - Page footer

Post Components
PostCard - Individual post preview card

PostList - Grid layout for multiple posts

PostForm - Form for creating/editing posts

UI Components
LoadingSpinner - Loading indicator

SearchBar - Search input with clear functionality

Pagination - Page navigation controls

Pages
Home - Landing page with hero section and featured posts

Posts - All posts with search and filtering

SinglePost - Full post view with metadata

CreatePost - Form to create new posts

EditPost - Form to edit existing posts

NotFound - 404 error page

🔧 Custom Hooks
useApi
Generic hook for API calls with loading and error states:

javascript
const { data, loading, error, execute } = useApi(apiFunction)
usePosts
Specialized hook for post management:

javascript
const { 
  posts, 
  loading, 
  error, 
  filters, 
  pagination, 
  fetchPosts,
  createPost,
  updatePost,
  deletePost 
} = usePosts()
🎯 Usage Examples
Creating a Post
javascript
const postData = {
  title: "My First Blog Post",
  content: "This is the content of my blog post...",
  author: "John Doe",
  category: "Technology",
  tags: ["react", "javascript", "webdev"],
  status: "published"
}

await createPost(postData)
Searching Posts
javascript
// Search for posts containing "react"
await fetchPosts({ search: "react" })

// Filter by category
await fetchPosts({ category: "Technology" })

// Combine search and pagination
await fetchPosts({ 
  search: "javascript", 
  category: "Programming",
  page: 2,
  limit: 5
})
