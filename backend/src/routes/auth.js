const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// Sign up (Admin or volunteer registration)
router.post('/signup', async (req, res) => {
  try {
    const { email, password, full_name } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: full_name || '',
          role: 'admin'
        }
      }
    });

    if (error) throw error;
    res.status(201).json({
      message: 'Account created successfully',
      user: data.user,
      session: data.session
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Sign in (Admin login)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    res.json({
      token: data.session?.access_token,
      user: data.user,
      session: data.session
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

// Get current user details
router.get('/me', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) throw error || new Error('User not found');
    res.json(user);
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

module.exports = router;
