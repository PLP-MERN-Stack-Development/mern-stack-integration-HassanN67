import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MERN Blog
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover amazing stories, share your thoughts, and join our community of writers and readers.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              to="/posts" 
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Explore All Posts
            </Link>
            <Link 
              to="/create-post" 
              className="px-8 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200 font-medium"
            >
              Write a Post
            </Link>
          </div>
        </div>
      </section>

      {/* Temporary message until we have posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Blog Posts Coming Soon
            </h3>
            <p className="text-slate-600 mb-6">
              Connect to the server to see blog posts here.
            </p>
            <Link 
              to="/create-post" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Create First Post
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}