import api from './api';

export const postService = {
  // Get all posts
  getPosts: (params = {}) => {
    return api.get('/posts', { params });
  },

  // Get single post
  getPost: (id) => {
    return api.get(`/posts/${id}`);
  },

  // Create post
  createPost: (postData) => {
    return api.post('/posts', postData);
  },

  // Update post
  updatePost: (id, postData) => {
    return api.put(`/posts/${id}`, postData);
  },

  // Delete post
  deletePost: (id) => {
    return api.delete(`/posts/${id}`);
  }
};

export const categoryService = {
  // Get all categories
  getCategories: () => {
    return api.get('/categories');
  }
};