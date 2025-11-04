const express = require('express');
const Post = require('../models/post');
const router = express.Router();

// GET /api/posts - Get all posts with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      search, 
      status = 'published',
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;
    
    // Build query object
    let query = {};
    
    // Filter by status if provided
    if (status) {
      query.status = status;
    }
    
    // Filter by category if provided
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Search in title and content
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    // Sort configuration
    const sortConfig = {};
    sortConfig[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    // Execute query with pagination
    const posts = await Post.find(query)
      .sort(sortConfig)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    // Get total count for pagination
    const total = await Post.countDocuments(query);
    
    res.json({
      success: true,
      data: posts,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching posts',
      error: error.message 
    });
  }
});

// GET /api/posts/:id - Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: 'Post not found' 
      });
    }
    
    // Increment view count
    post.viewCount += 1;
    await post.save();
    
    res.json({ 
      success: true, 
      data: post 
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid post ID' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching post',
      error: error.message 
    });
  }
});

// POST /api/posts - Create new post
router.post('/', async (req, res) => {
  try {
    const { title, content, author, category, tags, status } = req.body;
    
    // Validation
    if (!title || !title.trim()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Post title is required' 
      });
    }
    
    if (!content || !content.trim()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Post content is required' 
      });
    }
    
    // Process tags - convert string to array if needed
    let processedTags = [];
    if (tags) {
      if (typeof tags === 'string') {
        processedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      } else if (Array.isArray(tags)) {
        processedTags = tags;
      }
    }
    
    const postData = {
      title: title.trim(),
      content: content.trim(),
      author: author?.trim() || 'Anonymous',
      category: category?.trim() || 'General',
      tags: processedTags,
      status: status || 'draft'
    };
    
    const post = await Post.create(postData);
    
    res.status(201).json({ 
      success: true, 
      message: 'Post created successfully',
      data: post 
    });
  } catch (error) {
    console.error('Error creating post:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error',
        errors 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Error creating post',
      error: error.message 
    });
  }
});

// PUT /api/posts/:id - Update post
router.put('/:id', async (req, res) => {
  try {
    const { title, content, author, category, tags, status } = req.body;
    
    // Check if post exists
    const existingPost = await Post.findById(req.params.id);
    if (!existingPost) {
      return res.status(404).json({ 
        success: false, 
        message: 'Post not found' 
      });
    }
    
    // Process tags
    let processedTags = existingPost.tags;
    if (tags) {
      if (typeof tags === 'string') {
        processedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      } else if (Array.isArray(tags)) {
        processedTags = tags;
      }
    }
    
    const updateData = {
      title: title?.trim() || existingPost.title,
      content: content?.trim() || existingPost.content,
      author: author?.trim() || existingPost.author,
      category: category?.trim() || existingPost.category,
      tags: processedTags,
      status: status || existingPost.status
    };
    
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      updateData,
      { 
        new: true, 
        runValidators: true 
      }
    );
    
    res.json({ 
      success: true, 
      message: 'Post updated successfully',
      data: post 
    });
  } catch (error) {
    console.error('Error updating post:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error',
        errors 
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid post ID' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Error updating post',
      error: error.message 
    });
  }
});

// DELETE /api/posts/:id - Delete post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: 'Post not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Post deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid post ID' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting post',
      error: error.message 
    });
  }
});

// GET /api/posts/categories/list - Get unique categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Post.distinct('category', { status: 'published' });
    
    res.json({
      success: true,
      data: categories.sort()
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching categories',
      error: error.message 
    });
  }
});

module.exports = router;