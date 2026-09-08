const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const { requireAuth } = require('../middleware/auth');

// Get all published blogs
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all blogs (admin — includes drafts)
router.get('/all', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', req.params.slug)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: 'Blog post not found' });
  }
});

// Create blog (admin only)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, slug, content, excerpt, image_url, published } = req.body;
    const { data, error } = await supabase
      .from('blogs')
      .insert([{ title, slug, content, excerpt, image_url, published: published || false, author_id: req.user.id }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update blog (admin only)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { title, slug, content, excerpt, image_url, published } = req.body;
    const { data, error } = await supabase
      .from('blogs')
      .update({ title, slug, content, excerpt, image_url, published })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete blog (admin only)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
