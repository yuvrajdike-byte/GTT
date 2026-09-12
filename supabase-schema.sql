-- =========================================================
-- GTT Foundation NGO Database Schema
-- Complete Supabase SQL Script (Schema + Policies + Seed Data)
-- Run this in the Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)
-- =========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================================
-- 1. TABLES
-- =========================================================

-- 1. Programs Table
CREATE TABLE IF NOT EXISTS public.programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) DEFAULT 'General',
    description TEXT NOT NULL,
    target_beneficiaries VARCHAR(255),
    target_amount NUMERIC(12, 2) DEFAULT 0,
    raised_amount NUMERIC(12, 2) DEFAULT 0,
    image_url TEXT,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'upcoming')),
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Events Table
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    event_date TIMESTAMPTZ NOT NULL,
    location VARCHAR(255) NOT NULL,
    organizer VARCHAR(150) DEFAULT 'GTT Team',
    category VARCHAR(100) DEFAULT 'Community',
    capacity INT DEFAULT 100,
    registered_count INT DEFAULT 0,
    image_url TEXT,
    status VARCHAR(50) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Blogs / Articles Table
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100) DEFAULT 'Impact Stories',
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    author_name VARCHAR(150) DEFAULT 'GTT Editorial Team',
    author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    image_url TEXT,
    published BOOLEAN DEFAULT true,
    published_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Contact / Inquiries Table
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'responded')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Donations Table
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    currency VARCHAR(10) DEFAULT 'INR',
    program_id UUID REFERENCES public.programs(id) ON DELETE SET NULL,
    payment_method VARCHAR(50) DEFAULT 'UPI',
    message TEXT,
    is_anonymous BOOLEAN DEFAULT false,
    payment_status VARCHAR(50) DEFAULT 'completed' CHECK (payment_status IN ('pending', 'completed', 'failed')),
    transaction_id VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Volunteer Applications Table
CREATE TABLE IF NOT EXISTS public.volunteers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    skills TEXT,
    availability VARCHAR(100),
    interest_area VARCHAR(100),
    message TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- =========================================================
-- 2. INDEXES (For Fast Queries & Sorting)
-- =========================================================

CREATE INDEX IF NOT EXISTS idx_programs_status ON public.programs(status);
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(event_date);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON public.blogs(published);
CREATE INDEX IF NOT EXISTS idx_donations_created ON public.donations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON public.contacts(status);
CREATE INDEX IF NOT EXISTS idx_volunteers_status ON public.volunteers(status);

-- =========================================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================

-- Enable RLS on all tables
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;

-- Clean existing policies for idempotency
DROP POLICY IF EXISTS "Public Read Programs" ON public.programs;
DROP POLICY IF EXISTS "Public Read Events" ON public.events;
DROP POLICY IF EXISTS "Public Read Published Blogs" ON public.blogs;
DROP POLICY IF EXISTS "Public Insert Contacts" ON public.contacts;
DROP POLICY IF EXISTS "Public Insert Donations" ON public.donations;
DROP POLICY IF EXISTS "Public Insert Volunteers" ON public.volunteers;

DROP POLICY IF EXISTS "Admin Full Access Programs" ON public.programs;
DROP POLICY IF EXISTS "Admin Full Access Events" ON public.events;
DROP POLICY IF EXISTS "Admin Full Access Blogs" ON public.blogs;
DROP POLICY IF EXISTS "Admin Full Access Contacts" ON public.contacts;
DROP POLICY IF EXISTS "Admin Full Access Donations" ON public.donations;
DROP POLICY IF EXISTS "Admin Full Access Volunteers" ON public.volunteers;

-- Public Read Policies
CREATE POLICY "Public Read Programs" ON public.programs FOR SELECT USING (true);
CREATE POLICY "Public Read Events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public Read Published Blogs" ON public.blogs FOR SELECT USING (published = true);

-- Public Insert Policies
CREATE POLICY "Public Insert Contacts" ON public.contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Donations" ON public.donations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Volunteers" ON public.volunteers FOR INSERT WITH CHECK (true);

-- Authenticated Admin Policies (Full CRUD)
CREATE POLICY "Admin Full Access Programs" ON public.programs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Events" ON public.events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Blogs" ON public.blogs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Contacts" ON public.contacts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Donations" ON public.donations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Volunteers" ON public.volunteers FOR ALL USING (auth.role() = 'authenticated');

-- =========================================================
-- 4. INITIAL SEED DATA
-- =========================================================

-- Seed Programs
INSERT INTO public.programs (title, category, description, target_beneficiaries, target_amount, raised_amount, image_url, status, featured)
VALUES
(
    'Solar Smart Classrooms',
    'Education',
    'Equipping rural government schools with solar panels, smart tablets, interactive STEM content, and offline digital libraries to bridge the rural-urban learning divide.',
    '15,000 Rural Students',
    1500000,
    980000,
    'https://images.unsplash.com/photo-1692269725851-f5d3a3f02807?w=800&auto=format&fit=crop&q=80',
    'active',
    true
),
(
    'Mobile Rural Health Van Network',
    'Healthcare',
    'Operating fully equipped medical transit vans with diagnostic testing, free chronic illness medications, and maternal healthcare specialists reaching remote villages weekly.',
    '25,000 Villagers',
    2000000,
    1450000,
    'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&auto=format&fit=crop&q=80',
    'active',
    true
),
(
    'Women Micro-Enterprise & Craft Guild',
    'Livelihoods',
    'Empowering self-help groups with tailoring machines, sustainable textile training, direct marketplace connections, and zero-interest seed capital grants.',
    '1,200 Women Artisans',
    800000,
    620000,
    'https://images.unsplash.com/photo-1646578486121-67aed93c4f4e?w=800&auto=format&fit=crop&q=80',
    'active',
    true
),
(
    'Clean Water & Solar Filtration Units',
    'Sanitation',
    'Installing community-managed solar RO water filtration systems in fluoride and arsenic-affected drought regions of Maharashtra and Rajasthan.',
    '8 Gram Panchayats',
    1200000,
    890000,
    'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=800&auto=format&fit=crop&q=80',
    'active',
    false
)
ON CONFLICT DO NOTHING;

-- Seed Events
INSERT INTO public.events (title, description, event_date, location, organizer, category, capacity, registered_count, image_url, status)
VALUES
(
    'Comprehensive Eye & Cataract Screening Camp',
    'Free vision testing, prescription glasses distribution, and zero-cost cataract surgical referral camps for senior citizens in rural talukas.',
    NOW() + INTERVAL '7 days',
    'Community Health Center, Shirur, Pune',
    'GTT Medical Division',
    'Healthcare',
    250,
    142,
    'https://images.unsplash.com/photo-1659353888906-adb3e0041693?w=800&auto=format&fit=crop&q=80',
    'upcoming'
),
(
    'STEM Innovators Fair & Coding Showcase',
    'Rural students from our solar smart schools showcase robotics projects, solar models, and software creations to academic mentors and industry leaders.',
    NOW() + INTERVAL '18 days',
    'Zilla Parishad High School, Baramati',
    'GTT Education Team',
    'Education',
    400,
    285,
    'https://images.unsplash.com/photo-1562789233-495f52b583dd?w=800&auto=format&fit=crop&q=80',
    'upcoming'
),
(
    'Women Entrepreneurs Handloom Bazaar',
    'Annual exhibition and direct-to-consumer sales fair showcasing indigenous handloom, organic honey, and handmade crafts produced by rural women guilds.',
    NOW() + INTERVAL '30 days',
    'Sambhaji Park Exhibition Grounds, Pune',
    'Livelihoods Cell',
    'Livelihoods',
    600,
    340,
    'https://images.unsplash.com/photo-1698768195616-2d49cb36477f?w=800&auto=format&fit=crop&q=80',
    'upcoming'
)
ON CONFLICT DO NOTHING;

-- Seed Impact Blogs
INSERT INTO public.blogs (title, slug, category, excerpt, content, author_name, image_url, published)
VALUES
(
    'How Solar Classrooms Ignited Learning in 20 Maharashtra Villages',
    'how-solar-classrooms-ignited-learning',
    'Education Impact',
    'Before solar smart boards, frequent 8-hour power cuts halted learning. Today, students attend digital sessions and achieve 94% board exam pass rates.',
    'Education is the bedrock of societal transformation. When our ground team first visited the remote talukas of Shirur, school attendance had dipped below 60% due to erratic power grids and dilapidated learning resources.\n\nThrough community partnership and generous corporate patrons, we installed rooftop solar micro-grids and modern interactive touch-displays. The results have been extraordinary: school enrollment has jumped by 38%, and mathematics proficiency has doubled across 20 participating village schools.',
    'Dr. Meera Kulkarni',
    'https://images.unsplash.com/photo-1692269725911-87697c558be1?w=800&auto=format&fit=crop&q=80',
    true
),
(
    'From Daily Wage Laborer to Cooperative Leader: Sunita Bai''s Story',
    'from-daily-wage-to-cooperative-leader',
    'Women Empowerment',
    'With a micro-grant of ₹25,000 and 3 months of textile training, Sunita built an artisan cooperative employing 18 women in her village.',
    'Financial independence changes how a woman is heard in her community. Sunita Bai spent fifteen years working on seasonal agricultural contracts with zero economic security.\n\nAfter enrolling in our 90-day tailoring and business management curriculum, she took a zero-interest micro loan to procure three commercial sewing machines. Today, her cooperative supplies uniform fabric to five district schools, earning a steady monthly profit that funds her children''s college tuition.',
    'Rajesh Deshmukh',
    'https://images.unsplash.com/photo-1626523445530-804c4745be94?w=800&auto=format&fit=crop&q=80',
    true
)
ON CONFLICT (slug) DO NOTHING;

-- Seed Sample Donations Ledger
INSERT INTO public.donations (donor_name, email, phone, amount, currency, payment_method, message, is_anonymous, payment_status, transaction_id)
VALUES
('Anand Piramal', 'anand.p@example.com', '+91 98200 11223', 50000, 'INR', 'Bank Transfer', 'Support for the solar smart classroom expansion.', false, 'completed', 'TXN_GTT_98124'),
('Pooja Mehta', 'pooja.m@example.com', '+91 98331 44556', 15000, 'INR', 'UPI', 'For rural mobile clinic medicines.', false, 'completed', 'TXN_GTT_98125'),
('Dr. Vikram Rao', 'vikram.rao@example.com', '+91 94480 77889', 25000, 'INR', 'Credit Card', 'In memory of late Sh. K. S. Rao.', false, 'completed', 'TXN_GTT_98126'),
('Anonymous Patron', 'donor@confidential.org', NULL, 100000, 'INR', 'Bank Transfer', 'General foundation fund.', true, 'completed', 'TXN_GTT_98127')
ON CONFLICT DO NOTHING;

-- Seed Sample Inquiries
INSERT INTO public.contacts (name, email, phone, subject, message, status)
VALUES
('Aditi Sengupta', 'aditi.s@tcs.com', '+91 98201 55667', 'CSR Partnership Opportunity', 'We would like to explore sponsoring solar digital centers across 10 rural schools under our 2026-27 CSR allocation.', 'unread'),
('Prof. Harish Nair', 'hnair@unipune.ac.in', '+91 94220 33445', 'Student Volunteer Program Collaboration', 'Inviting GTT Foundation to recruit graduate social work interns from our university department for ground surveys.', 'read')
ON CONFLICT DO NOTHING;

-- Seed Sample Volunteers
INSERT INTO public.volunteers (full_name, email, phone, skills, availability, interest_area, message, status)
VALUES
('Sneha Joshi', 'sneha.j@gmail.com', '+91 98901 22334', 'Content writing, English teaching, Social Media', 'Weekends (8 hrs/week)', 'Education & Literacy', 'Passionate about mentoring young girls in rural schools.', 'approved'),
('Karan Malhotra', 'karan.m@gmail.com', '+91 98199 88776', 'Physiotherapy, Basic first aid, Camp coordination', 'Full-time on field drives', 'Healthcare & Clinics', 'Available to travel with the mobile medical vans.', 'approved')
ON CONFLICT DO NOTHING;
