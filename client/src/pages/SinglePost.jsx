import { Link } from 'react-router-dom';

export default function SinglePost() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Post Not Found</h1>
        <p className="text-slate-600 mb-6">
          The post you're looking for doesn't exist or the server is not connected.
        </p>
        <Link 
          to="/posts" 
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Back to Posts
        </Link>
      </div>
    </div>
  );
}