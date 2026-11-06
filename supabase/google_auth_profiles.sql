-- ==============================================================================
-- UNIVERSAL AUTH & PROFILES SQL SETUP (GOOGLE OAUTH + REGULAR EMAIL/PASSWORD)
-- ==============================================================================
-- This script supports BOTH:
--   1. Google OAuth Sign-In (automatic avatar, name, email)
--   2. Regular Student Email & Password Registration/Sign-In (name, phone, course level)
--
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql

-- 1. Create the public profiles table linked to Supabase auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    course_level TEXT DEFAULT 'intermediate' CHECK (course_level IN ('class-10', 'intermediate', 'diploma', 'btech')),
    role TEXT DEFAULT 'student' CHECK (role IN ('student', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Profiles RLS Policies (Allowing both Google & Regular students)

-- Drop existing policies if they already exist to avoid errors
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow system insert on profiles" ON public.profiles;

-- Students (both Google & Regular) can view their own profile
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

-- Admins can view all student and teacher profiles
CREATE POLICY "Admins can view all profiles"
    ON public.profiles FOR SELECT
    USING (
        auth.jwt() ->> 'email' IN ('yashuaminigadda@gmail.com', 'yashuaminigadda2@gmail.com', 'mathsnaresheclass@gmail.com')
        OR auth.role() = 'service_role'
    );

-- Students can update their own profile (phone, course level, name)
CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Allow profile creation on signup (Google OAuth or Email/Password)
CREATE POLICY "Allow system insert on profiles"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id OR auth.role() = 'service_role');

-- 4. Unified function to handle BOTH Google OAuth and Regular Student signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    user_full_name TEXT;
    user_avatar TEXT;
    user_phone TEXT;
    user_level TEXT;
    user_role TEXT;
BEGIN
    -- Extract full name (works for Google 'name'/'full_name' or Regular Signup 'full_name')
    user_full_name := COALESCE(
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'name',
        split_part(NEW.email, '@', 1)
    );

    -- Extract avatar (from Google OAuth or custom upload)
    user_avatar := COALESCE(
        NEW.raw_user_meta_data->>'avatar_url',
        NEW.raw_user_meta_data->>'picture',
        ''
    );

    -- Extract phone (from regular student registration form)
    user_phone := COALESCE(
        NEW.raw_user_meta_data->>'phone',
        NEW.phone,
        ''
    );

    -- Extract course level (Class 10, Intermediate, Diploma, B.Tech)
    user_level := COALESCE(
        NEW.raw_user_meta_data->>'course_level',
        'intermediate'
    );

    -- Validate course level enum
    IF user_level NOT IN ('class-10', 'intermediate', 'diploma', 'btech') THEN
        user_level := 'intermediate';
    END IF;

    -- Automatically assign 'admin' role if matching authorized administrator emails
    IF LOWER(NEW.email) IN ('yashuaminigadda@gmail.com', 'yashuaminigadda2@gmail.com', 'mathsnaresheclass@gmail.com') THEN
        user_role := 'admin';
    ELSE
        user_role := 'student';
    END IF;

    -- Upsert profile record
    INSERT INTO public.profiles (
        id,
        email,
        full_name,
        avatar_url,
        phone,
        course_level,
        role,
        updated_at
    )
    VALUES (
        NEW.id,
        NEW.email,
        user_full_name,
        user_avatar,
        user_phone,
        user_level,
        user_role,
        NOW()
    )
    ON CONFLICT (id) DO UPDATE
    SET
        email = EXCLUDED.email,
        full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
        avatar_url = CASE 
            WHEN EXCLUDED.avatar_url <> '' THEN EXCLUDED.avatar_url 
            ELSE profiles.avatar_url 
        END,
        phone = CASE 
            WHEN EXCLUDED.phone <> '' THEN EXCLUDED.phone 
            ELSE profiles.phone 
        END,
        course_level = COALESCE(EXCLUDED.course_level, profiles.course_level),
        role = EXCLUDED.role,
        updated_at = NOW();

    RETURN NEW;
END;
$$;

-- 5. Trigger on auth.users for new signups or updates (Google or Email/Password)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT OR UPDATE ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 6. (OPTIONAL BUT RECOMMENDED) AUTO-CONFIRM STUDENT EMAILS
-- ==============================================================================
-- In Supabase, if "Confirm Email" is enabled in settings, regular students cannot
-- log in until they click a verification link.
-- To allow regular students to sign up and log in immediately without waiting for an email:
-- Go to: Supabase Dashboard > Authentication > Providers > Email
-- and toggle OFF "Confirm email".
--
-- Or if you already have unconfirmed students in auth.users, run this query to confirm them:
-- UPDATE auth.users SET email_confirmed_at = NOW() WHERE email_confirmed_at IS NULL;
