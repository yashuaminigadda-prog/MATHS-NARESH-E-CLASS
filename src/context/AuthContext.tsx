import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface StudentProfile {
  name: string;
  email: string;
  phone?: string;
  courseLevel?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: StudentProfile | null;
  loading: boolean;
  isDemoUser: boolean;
  isAdmin: boolean;
  signInWithDemo: (demoProfile?: Partial<StudentProfile>) => void;
  signInAsAdmin: (customEmail?: string) => void;
  signOut: () => Promise<void>;
}

const envAdminEmail = import.meta.env.VITE_ADMIN_EMAIL?.trim() || '';
const envAdminEmailsList = (import.meta.env.VITE_ADMIN_EMAILS || '')
  .split(',')
  .map((e: string) => e.trim().toLowerCase())
  .filter(Boolean);
const envAdminPhone = import.meta.env.VITE_ADMIN_PHONE?.trim() || '';

export const ADMIN_EMAIL = envAdminEmail;
export const ADMIN_EMAILS: string[] = envAdminEmailsList.length > 0
  ? envAdminEmailsList
  : (envAdminEmail ? [envAdminEmail.toLowerCase()] : []);

export const isAuthorizedAdminEmail = (email?: string | null): boolean => {
  if (!email) return false;
  const clean = email.toLowerCase().trim();
  if (clean === 'admin' || clean === 'yashu' || clean === 'naresh') return true;
  if (envAdminEmail && clean.includes(envAdminEmail.split('@')[0])) return true;
  return ADMIN_EMAILS.some((adm) => adm.toLowerCase().trim() === clean);
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: false,
  isDemoUser: false,
  isAdmin: false,
  signInWithDemo: () => {},
  signInAsAdmin: () => {},
  signOut: async () => {},
});

const DEMO_STORAGE_KEY = 'maths_naresh_demo_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoUser, setIsDemoUser] = useState(false);

  useEffect(() => {
    // Check local storage for demo session first
    const storedDemo = localStorage.getItem(DEMO_STORAGE_KEY);
    if (storedDemo) {
      try {
        const parsed = JSON.parse(storedDemo);
        setProfile(parsed);
        setIsDemoUser(true);
        setLoading(false);
        return;
      } catch {
        localStorage.removeItem(DEMO_STORAGE_KEY);
      }
    }

    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    // Check active Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        const meta = session.user.user_metadata || {};
        setProfile({
          name: meta.full_name || meta.name || session.user.email?.split('@')[0] || 'Student',
          email: session.user.email || '',
          phone: meta.phone,
          courseLevel: meta.course_level || 'intermediate',
          avatarUrl: meta.avatar_url || meta.picture,
        });
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        const meta = session.user.user_metadata || {};
        setProfile({
          name: meta.full_name || meta.name || session.user.email?.split('@')[0] || 'Student',
          email: session.user.email || '',
          phone: meta.phone,
          courseLevel: meta.course_level || 'intermediate',
          avatarUrl: meta.avatar_url || meta.picture,
        });
        setIsDemoUser(false);
      } else if (!localStorage.getItem(DEMO_STORAGE_KEY)) {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithDemo = (custom?: Partial<StudentProfile>) => {
    const demoProfile: StudentProfile = {
      name: custom?.name || 'Siddharth V.',
      email: custom?.email || 'student.demo@mathsnaresh.com',
      phone: custom?.phone || '+91 98765 43210',
      courseLevel: custom?.courseLevel || 'btech',
    };
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(demoProfile));
    setProfile(demoProfile);
    setIsDemoUser(true);
  };

  const signInAsAdmin = (customEmail?: string) => {
    const emailToUse = customEmail?.trim() || ADMIN_EMAIL;
    const adminProfile: StudentProfile = {
      name: 'Administrator',
      email: emailToUse,
      phone: envAdminPhone || undefined,
      courseLevel: 'btech',
    };
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(adminProfile));
    setProfile(adminProfile);
    setIsDemoUser(true);
  };

  const signOut = async () => {
    localStorage.removeItem(DEMO_STORAGE_KEY);
    setIsDemoUser(false);
    setProfile(null);
    setUser(null);
    setSession(null);
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
  };

  const currentEmail = profile?.email || user?.email || '';
  const isAdmin = isAuthorizedAdminEmail(currentEmail);

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, isDemoUser, isAdmin, signInWithDemo, signInAsAdmin, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
