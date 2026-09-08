const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const { requireAuth } = require('../middleware/auth');

// Public: Submit volunteer application
router.post('/', async (req, res) => {
  try {
    const { full_name, email, phone, skills, availability, interest_area, message } = req.body;

    if (!full_name || !email || !phone) {
      return res.status(400).json({ error: 'Full name, email, and phone are required' });
    }

    const { data, error } = await supabase
      .from('volunteers')
      .insert([{
        full_name,
        email,
        phone,
        skills,
        availability,
        interest_area,
        message,
        status: 'pending'
      }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ message: 'Volunteer application submitted successfully!', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Get all volunteer applications
router.get('/', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('volunteers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Update application status
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const { data, error } = await supabase
      .from('volunteers')
      .update({ status })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Delete application
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { error } = await supabase
      .from('volunteers')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Volunteer application deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
