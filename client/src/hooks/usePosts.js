import { useState, useCallback } from 'react';
import { postService } from '../services/postService';

export function usePosts(initialFilters = {}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: '',
    category: '',
    ...initialFilters,
  });
  const [pagination, setPagination] = useState({});

  const fetchPosts = useCallback(async (newFilters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const mergedFilters = { ...filters, ...newFilters };
      const response = await postService.getPosts(mergedFilters);
      
      setPosts(response.data.data);
      setPagination(response.data.pagination);
      setFilters(mergedFilters);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const createPost = useCallback(async (postData) => {
    try {
      const response = await postService.createPost(postData);
      setPosts(prev => [response.data.data, ...prev]);
      return response.data;
    } catch (err) {
      throw err;
    }
  }, []);

  const deletePost = useCallback(async (id) => {
    try {
      await postService.deletePost(id);
      setPosts(prev => prev.filter(post => post._id !== id));
    } catch (err) {
      throw err;
    }
  }, []);

  return {
    posts,
    loading,
    error,
    filters,
    pagination,
    fetchPosts,
    createPost,
    deletePost,
    setPosts,
  };
}