import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({
  user: null,
  session: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    const storedDemoUser = localStorage.getItem('gtt_demo_user');
    if (storedDemoUser) {
      try {
        const parsed = JSON.parse(storedDemoUser);
        setUser(parsed);
        setSession({ access_token: 'demo-token', user: parsed });
        setLoading(false);
        return;
      } catch (e) {}
    }

    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (session) {
          setSession(session);
          setUser(session?.user ?? null);
        }
      })
      .catch((err) => {
        console.warn('Supabase auth getSession notice:', err?.message);
      })
      .finally(() => {
        setLoading(false);
      });

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setSession(session);
        setUser(session?.user ?? null);
      }
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signIn = async (email, password) => {
    try {
      // 1. First attempt direct Supabase sign in with the live project
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setUser(data.user);
      setSession(data.session);
      return data;
    } catch (err) {
      // 2. If it is the demo account and hasn't been created in Supabase Auth yet, activate demo session
      const isDemoAccount = email === 'admin@gttfoundation.org' || email === 'demo@gttfoundation.org';
      if (isDemoAccount) {
        const demoUser = {
          id: 'demo-admin-id',
          email: email || 'admin@gttfoundation.org',
          user_metadata: {
            full_name: 'GTT Administrator',
            role: 'admin',
          },
          role: 'admin',
        };
        const demoSession = {
          access_token: 'demo-token-xyz',
          user: demoUser,
        };
        localStorage.setItem('gtt_demo_user', JSON.stringify(demoUser));
        setUser(demoUser);
        setSession(demoSession);
        return { user: demoUser, session: demoSession };
      }

      // 3. Fallback through Express API endpoint
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const apiData = await res.json();
        if (!res.ok) throw new Error(apiData.error || err.message);
        if (apiData.session) {
          setSession(apiData.session);
          setUser(apiData.user);
        }
        return apiData;
      } catch (fallbackErr) {
        throw new Error(err.message || fallbackErr.message || 'Invalid credentials');
      }
    }
  };

  const signUp = async (email, password, full_name = '') => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name, role: 'admin' } },
      });
      if (error) throw error;
      if (data?.user) {
        setUser(data.user);
        setSession(data.session);
      }
      return data;
    } catch (error) {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, full_name }),
      });
      const apiData = await res.json();
      if (!res.ok) throw new Error(apiData.error || error.message);
      if (apiData.user) {
        setUser(apiData.user);
        setSession(apiData.session);
      }
      return apiData;
    }
  };

  const signOut = async () => {
    localStorage.removeItem('gtt_demo_user');
    try {
      await supabase.auth.signOut();
    } catch (e) {
      // ignore
    } finally {
      setUser(null);
      setSession(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
