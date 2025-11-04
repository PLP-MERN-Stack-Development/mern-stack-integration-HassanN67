import { Link } from 'react-router-dom';

export default function Posts() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          All Blog Posts
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Discover our collection of articles, stories, and insights from our community
        </p>
      </div>

      {/* Temporary message */}
      <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Posts Loading
          </h3>
          <p className="text-slate-600 mb-6">
            Make sure your server is running to see blog posts.
          </p>
          <Link 
            to="/create-post" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Create New Post
          </Link>
        </div>
      </div>
    </div>
  );
}