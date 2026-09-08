const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const { requireAuth } = require('../middleware/auth');

// Record a donation (public)
router.post('/', async (req, res) => {
  try {
    const { donor_name, email, amount, message } = req.body;

    if (!donor_name || !email || !amount) {
      return res.status(400).json({ error: 'Name, email, and amount are required' });
    }

    const { data, error } = await supabase
      .from('donations')
      .insert([{ donor_name, email, amount, message }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ message: 'Thank you for your donation!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all donations (admin only)
router.get('/', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
