const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const { requireAuth } = require('../middleware/auth');

// Get all programs
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single program
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: 'Program not found' });
  }
});

// Create program (admin only)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, description, image_url, status } = req.body;
    const { data, error } = await supabase
      .from('programs')
      .insert([{ title, description, image_url, status: status || 'active' }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update program (admin only)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { title, description, image_url, status } = req.body;
    const { data, error } = await supabase
      .from('programs')
      .update({ title, description, image_url, status })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete program (admin only)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { error } = await supabase
      .from('programs')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Program deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
