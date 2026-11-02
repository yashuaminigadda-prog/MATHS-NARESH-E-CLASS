-- =========================================================
-- MATHS NARESH ECLASS - SUPABASE DATABASE SCHEMA
-- =========================================================
-- Execute this entire script in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CONTACT & INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT NOT NULL,
    course_level TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. STUDY RESOURCES (PDFs, Notes, Formula Sheets)
CREATE TABLE IF NOT EXISTS public.study_resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug_id TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    level_id TEXT NOT NULL,
    subject TEXT NOT NULL,
    chapter_name TEXT,
    resource_type TEXT NOT NULL CHECK (resource_type IN ('notes', 'formula_sheet', 'important_questions', 'model_paper', 'pyq')),
    file_format TEXT NOT NULL DEFAULT 'PDF',
    file_size TEXT,
    file_url TEXT,
    is_available BOOLEAN DEFAULT true,
    pages INTEGER DEFAULT 1,
    year TEXT,
    related_video_id TEXT,
    description TEXT,
    download_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. VIDEO LESSONS (YouTube Integration)
CREATE TABLE IF NOT EXISTS public.video_lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug_id TEXT UNIQUE NOT NULL,
    youtube_id TEXT NOT NULL,
    title TEXT NOT NULL,
    duration TEXT NOT NULL,
    level_id TEXT NOT NULL,
    subject TEXT NOT NULL,
    chapter_title TEXT NOT NULL,
    chapter_slug TEXT NOT NULL,
    unit_name TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    topic_tags TEXT[] DEFAULT '{}',
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. CHAPTERS TABLE
CREATE TABLE IF NOT EXISTS public.chapters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug_id TEXT UNIQUE NOT NULL,
    level_id TEXT NOT NULL,
    subject TEXT NOT NULL,
    unit_number INTEGER NOT NULL,
    chapter_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    summary TEXT,
    board_weightage TEXT,
    has_notes_pdf BOOLEAN DEFAULT false,
    notes_pdf_url TEXT,
    notes_page_count INTEGER,
    key_concepts JSONB DEFAULT '[]'::jsonb,
    formulas JSONB DEFAULT '[]'::jsonb,
    important_questions JSONB DEFAULT '[]'::jsonb,
    related_video_ids TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 6. NEWSLETTER / UPDATES SUBSCRIBERS
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE,
    phone TEXT,
    education_level TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 7. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- 8. RLS POLICIES

-- Public Read Policies (Anyone can read courses, chapters, videos, resources)
CREATE POLICY "Allow public read access on study_resources"
    ON public.study_resources FOR SELECT USING (true);

CREATE POLICY "Allow public read access on video_lessons"
    ON public.video_lessons FOR SELECT USING (true);

CREATE POLICY "Allow public read access on chapters"
    ON public.chapters FOR SELECT USING (true);

-- Public Insert Policies (Anyone can submit an inquiry or subscribe)
CREATE POLICY "Allow public submission of contact inquiries"
    ON public.contact_inquiries FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public newsletter subscription"
    ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);

-- Admin Full Access Policies (Allow yashuaminigadda@gmail.com, yashuaminigadda2@gmail.com, service_role, and authenticated admin to add, update, and delete)
CREATE POLICY "Allow admin full access on study_resources"
    ON public.study_resources FOR ALL
    USING (auth.jwt() ->> 'email' IN ('yashuaminigadda@gmail.com', 'yashuaminigadda2@gmail.com', 'mathsnaresheclass@gmail.com') OR auth.role() = 'service_role' OR auth.role() = 'authenticated')
    WITH CHECK (true);

CREATE POLICY "Allow admin full access on video_lessons"
    ON public.video_lessons FOR ALL
    USING (auth.jwt() ->> 'email' IN ('yashuaminigadda@gmail.com', 'yashuaminigadda2@gmail.com', 'mathsnaresheclass@gmail.com') OR auth.role() = 'service_role' OR auth.role() = 'authenticated')
    WITH CHECK (true);

CREATE POLICY "Allow admin full access on contact_inquiries"
    ON public.contact_inquiries FOR ALL
    USING (auth.jwt() ->> 'email' IN ('yashuaminigadda@gmail.com', 'yashuaminigadda2@gmail.com', 'mathsnaresheclass@gmail.com') OR auth.role() = 'service_role' OR auth.role() = 'authenticated')
    WITH CHECK (true);

CREATE POLICY "Allow admin full access on newsletter_subscribers"
    ON public.newsletter_subscribers FOR ALL
    USING (auth.jwt() ->> 'email' IN ('yashuaminigadda@gmail.com', 'yashuaminigadda2@gmail.com', 'mathsnaresheclass@gmail.com') OR auth.role() = 'service_role' OR auth.role() = 'authenticated')
    WITH CHECK (true);

-- 9. SEED INITIAL SAMPLE DATA FOR RESOURCES & VIDEOS
INSERT INTO public.study_resources (slug_id, title, level_id, subject, chapter_name, resource_type, file_format, file_size, file_url, is_available, pages, year, description)
VALUES 
    ('res-btech-m1-eigen', 'Eigenvalues & Diagonalization Quick Revision Notes', 'btech', 'Engineering Mathematics-I (M1)', 'Matrices & Linear Algebra', 'notes', 'PDF', '1.4 MB', '/sample_notes/engineering_matrices_sample.pdf', true, 12, '2024-25', 'Complete step-by-step notes covering Characteristic Equation, Cayley-Hamilton theorem, and Diagonalization problems.'),
    ('res-btech-m1-formula', 'M1 Complete Calculus & Linear Algebra Formula Sheet', 'btech', 'Engineering Mathematics-I (M1)', 'All Units', 'formula_sheet', 'PDF', '820 KB', '/sample_notes/engineering_matrices_sample.pdf', true, 6, '2024-25', 'All essential formulas, rank tests, Maclaurin expansions, and partial derivative rules in one place.'),
    ('res-inter-1a-trig', 'Class 11 / Inter 1A Trigonometry Transformations Handwritten Notes', 'intermediate', 'Mathematics 1A', 'Trigonometric Ratios & Transformations', 'notes', 'PDF', '2.1 MB', '/sample_notes/engineering_matrices_sample.pdf', true, 18, '2024-25', 'Standard transformations, maximum-minimum values, conditional identities with shortcuts.'),
    ('res-inter-2a-complex', 'Class 12 / Inter 2A Complex Numbers & De Moivres Theorem Mastery', 'intermediate', 'Mathematics 2A', 'Complex Numbers', 'notes', 'PDF', '1.8 MB', '/sample_notes/engineering_matrices_sample.pdf', true, 16, '2024-25', 'Modulus-amplitude form, loci problems, nth roots of unity, and De Moivres applications.')
ON CONFLICT (slug_id) DO NOTHING;

INSERT INTO public.video_lessons (slug_id, youtube_id, title, duration, level_id, subject, chapter_title, chapter_slug, unit_name, description, thumbnail_url, is_featured, topic_tags, order_index)
VALUES
    ('v-c10-real-numbers', '_-QIfTVhn_Y', '10th Class Maths: Real Numbers (Complete Chapter Playlist)', 'Full Playlist', 'class-10', 'Class 10 Mathematics', 'Real Numbers', 'real-numbers', 'Unit I: Number Systems', 'Detailed Telugu + English lectures covering Euclid Division Lemma, Fundamental Theorem of Arithmetic, irrationality proofs of √2, √3, √5, and logarithms.', 'https://img.youtube.com/vi/_-QIfTVhn_Y/hqdefault.jpg', true, ARRAY['Real Numbers', 'Irrationality Proofs', 'Euclid Lemma', 'Class 10 Board'], 1),
    ('v-c10-progressions', 'PXmpx0Cx3PY', '10th Class Maths: Progressions (Arithmetic & Geometric Progressions)', 'Full Playlist', 'class-10', 'Class 10 Mathematics', 'Progressions', 'progressions', 'Unit II: Algebra', 'Complete playlist on Arithmetic Progressions (AP) and Geometric Progressions (GP). Finding nth term, sum of first n terms, and previous board exam problems.', 'https://img.youtube.com/vi/PXmpx0Cx3PY/hqdefault.jpg', true, ARRAY['Progressions', 'Arithmetic Progression', 'Geometric Progression', 'AP & GP'], 2),
    ('v-c10-coordinate-geometry', 'L5osaqgPjkY', '10th Class Maths: Co-ordinate Geometry (Complete Playlist)', 'Full Playlist', 'class-10', 'Class 10 Mathematics', 'Coordinate Geometry', 'coordinate-geometry', 'Unit III: Coordinate Geometry', 'Master distance formula, section formula, midpoint theorem, centroid of triangle, collinearity condition, and area of a triangle with easy shortcuts.', 'https://img.youtube.com/vi/L5osaqgPjkY/hqdefault.jpg', true, ARRAY['Coordinate Geometry', 'Distance Formula', 'Section Formula', 'Collinearity'], 3),
    ('v-c10-trigonometry', 'eNbnXccT2ZQ', '10th Class Maths AP/TS: Trigonometry (Complete Chapter Series)', 'Full Playlist', 'class-10', 'Class 10 Mathematics', 'Introduction to Trigonometry', 'introduction-to-trigonometry', 'Unit IV: Trigonometry', 'Comprehensive AP/TS 10th class trigonometry lecture series covering trig ratios, standard angle values table, complementary angles, and high-scoring identity proofs.', 'https://img.youtube.com/vi/eNbnXccT2ZQ/hqdefault.jpg', true, ARRAY['Trigonometry', 'Identities Proofs', 'Trig Values Table', 'AP/TS 10th'], 4),
    ('v-c10-surface-areas', 'sn0yr5yzcno', '10th Class Maths: Surface Areas & Volumes (Complete Series)', 'Full Playlist', 'class-10', 'Class 10 Mathematics', 'Surface Areas & Volumes', 'surface-areas-and-volumes', 'Unit V: Mensuration', 'In-depth derivation and problem solving for combinations of solids (cylinders, cones, spheres, hemispheres) and shape conversions for board examinations.', 'https://img.youtube.com/vi/sn0yr5yzcno/hqdefault.jpg', true, ARRAY['Surface Areas', 'Volumes', 'Mensuration', 'Combination of Solids'], 5),
    ('v-int-hyperbolic', 'Wg1vpcW2TpU', 'Inter 1st Year Maths 1A: Hyperbolic Functions (Complete Playlist)', 'Full Playlist', 'intermediate', 'Intermediate Mathematics 1A', 'Hyperbolic Functions', 'hyperbolic-functions', 'Unit IV: Trigonometry & Hyperbolic Functions', 'Comprehensive derivation of hyperbolic sine, cosine, tangent relations, identities, inverse hyperbolic formulas, and board questions.', 'https://img.youtube.com/vi/Wg1vpcW2TpU/hqdefault.jpg', true, ARRAY['Maths 1A', 'Hyperbolic Functions', 'sinh & cosh', 'Inter 1st Year'], 6),
    ('v-int-inv-trig', '3u4H_sG7J8E', 'Inter 1st Year Maths 1A: Inverse Trigonometric Functions (Complete Series)', 'Full Playlist', 'intermediate', 'Intermediate Mathematics 1A', 'Inverse Trigonometric Functions', 'inverse-trigonometric-functions', 'Unit III: Trigonometry', 'Step-by-step video lectures on principal value branches, domain & range, transformation properties, and board exam proofs.', 'https://img.youtube.com/vi/3u4H_sG7J8E/hqdefault.jpg', true, ARRAY['Maths 1A', 'Inverse Trigonometry', 'Principal Values', 'IPE 1st Year'], 7),
    ('v-int-trig-transform', 'yLSbm8mPFfo', 'Inter 1st Year Maths 1A: Trigonometric Ratios upto Transformations', 'Full Playlist', 'intermediate', 'Intermediate Mathematics 1A', 'Trigonometric Ratios upto Transformations', 'trigonometric-ratios-transformations', 'Unit II: Trigonometry', 'Compound angles, multiple & submultiple angles, transformation of sums into products and products into sums with 7-mark IPE questions.', 'https://img.youtube.com/vi/yLSbm8mPFfo/hqdefault.jpg', true, ARRAY['Maths 1A', 'Trigonometry', 'Transformations', 'IPE 7 Marks'], 8),
    ('v-int-pair-straight-lines', 'SvvYj2QC_Hs', 'Inter 1st Year Maths 1B: Pair of Straight Lines (Complete Chapter)', 'Full Playlist', 'intermediate', 'Intermediate Mathematics 1B', 'Pair of Straight Lines', 'pair-of-straight-lines', 'Unit II: Coordinate Geometry', 'Homogeneous equations ax² + 2hxy + by² = 0, angle between lines, bisectors of angles, condition for perpendicular lines, and second-degree general equations.', 'https://img.youtube.com/vi/SvvYj2QC_Hs/hqdefault.jpg', true, ARRAY['Maths 1B', 'Pair of Lines', 'Coordinate Geometry', 'Homogeneous Equations'], 9),
    ('v-int-locus', 'whrJMEP81FM', 'Inter 1st Year Maths 1B: Locus (Complete Playlist)', 'Full Playlist', 'intermediate', 'Intermediate Mathematics 1B', 'Locus', 'locus', 'Unit I: Coordinate Geometry', 'Finding equation of locus under given geometric conditions, ratio of distances, right angle conditions, and full 4-mark board problem solutions.', 'https://img.youtube.com/vi/whrJMEP81FM/hqdefault.jpg', true, ARRAY['Maths 1B', 'Locus', 'Coordinate Geometry', 'IPE 4 Marks'], 10),
    ('v-int-transformation-axes', 'wAuB7x3bVyI', 'Inter 1st Year Maths 1B: Transformation of Axes (Complete Series)', 'Full Playlist', 'intermediate', 'Intermediate Mathematics 1B', 'Transformation of Axes', 'transformation-of-axes', 'Unit I: Coordinate Geometry', 'Translation and rotation of coordinate axes, finding transformed equations, removing xy terms, and invariant properties under coordinate change.', 'https://img.youtube.com/vi/wAuB7x3bVyI/hqdefault.jpg', true, ARRAY['Maths 1B', 'Transformation of Axes', 'Translation', 'Rotation of Axes'], 11),
    ('v-int-errors-approx', 'zHq--0YnFWM', 'Inter 1st Year Maths 1B: Errors & Approximations (Differential Calculus)', 'Full Playlist', 'intermediate', 'Intermediate Mathematics 1B', 'Errors & Approximations', 'errors-and-approximations', 'Unit III: Calculus (Applications of Derivatives)', 'Differential dy = f\'(x)dx, calculating absolute error, relative error, percentage error in geometric shapes, and application problems.', 'https://img.youtube.com/vi/zHq--0YnFWM/hqdefault.jpg', true, ARRAY['Maths 1B', 'Errors & Approximations', 'Differentials', 'Calculus'], 12)
ON CONFLICT (slug_id) DO NOTHING;


