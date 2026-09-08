const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://glejeuvbpbetduhazwfn.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsZWpldXZicGJldGR1aGF6d2ZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4MzkzMTgsImV4cCI6MjEwNDQxNTMxOH0.1z1o76Zf_ueIuqnE2gO9cEq8Yhc9yrgasGDOJNEHHno';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
