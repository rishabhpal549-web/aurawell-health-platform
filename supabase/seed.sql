-- ==========================================================================
-- AuraWell PostgreSQL Database Seed Data
-- ==========================================================================

-- Seed Verified Experts and Users
INSERT INTO public.profiles (
    id, username, display_name, email, role, avatar_url, bio, credentials, verified, followers_count, following_count, wellness_interests, preferred_language
) VALUES
(
    '00000000-0000-0000-0000-000000000001',
    'dr_priya_sharma',
    'Dr. Priya Sharma, MD',
    'priya.sharma@aurawell.org',
    'verified_expert',
    'assets/images/doctor-priya.jpg',
    'Integrative Physician & Clinical Nutritionist. AIIMS Alum. Dedicated to lifestyle medicine and evidence-based wellness.',
    'MBBS, MD (Medicine), PG Dip Clinical Nutrition',
    TRUE,
    14820,
    194,
    ARRAY['Nutrition', 'Metabolic Health', 'Gut Health', 'Preventive Care'],
    'hi'
),
(
    '00000000-0000-0000-0000-000000000002',
    'coach_rahul',
    'Rahul Verma',
    'rahul.fit@aurawell.org',
    'verified_expert',
    'assets/images/coach-rahul.jpg',
    'Yoga Practitioner (500hr RYT) & Functional Movement Coach. Helping you build sustainable morning routines and spinal flexibility.',
    'Certified Yoga Acharya (RYT-500), CSCS Coach',
    TRUE,
    9340,
    128,
    ARRAY['Yoga', 'Mobility', 'Breathwork', 'Habit Building'],
    'en'
),
(
    '00000000-0000-0000-0000-000000000003',
    'ananya_admin',
    'Ananya Deshmukh (Admin)',
    'admin@aurawell.org',
    'admin',
    'assets/images/aurawell-logo.jpg',
    'Platform Safety, Content Standards & Clinical Review Lead at AuraWell.',
    'Head of Trust & Platform Integrity',
    TRUE,
    3410,
    45,
    ARRAY['Platform Safety', 'Health Ethics', 'Community Standards'],
    'en'
),
(
    '00000000-0000-0000-0000-000000000004',
    'aarav_wellness',
    'Aarav Patel',
    'aarav.patel@gmail.com',
    'regular',
    'assets/images/aurawell-logo.jpg',
    'Software engineer on a mission to beat sedentary burnout. Tracking hydration, daily steps, and clean vegetarian eating.',
    NULL,
    FALSE,
    312,
    245,
    ARRAY['Hydration', '10k Steps', 'Sleep Hygiene', 'Work-Life Balance'],
    'hi'
)
ON CONFLICT (id) DO NOTHING;

-- Seed Health Articles
INSERT INTO public.health_articles (
    id, author_id, title, title_hi, category, summary, content, cover_image_url, reviewer_name, reviewer_credentials, review_date, is_approved
) VALUES
(
    '10000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'The Science of Circadian Rhythms: How Morning Sunlight Regulates Sleep and Metabolism',
    'सर्केडियन रिदम का विज्ञान: सुबह की धूप कैसे नींद और मेटाबॉलिज्म को नियंत्रित करती है',
    'Sleep & Metabolism',
    'Exposure to natural morning sunlight within 60 minutes of waking triggers cortisol synthesis and sets the 14-hour timer for nocturnal melatonin release.',
    'Detailed medical overview of the suprachiasmatic nucleus, melanopsin photoreception, and circadian insulin sensitivity.',
    'assets/images/yoga-sunrise.jpg',
    'Dr. Rajesh Deshmukh, MD (Endocrinology)',
    'MD, DM Endocrinology',
    '2026-10-15',
    TRUE
),
(
    '10000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000001',
    'Evidence-Based Indian Plant Proteins: Combining Grains & Legumes for Complete Amino Acid Profiles',
    'साक्ष्य-आधारित भारतीय पादप प्रोटीन: पूर्ण अमीनो एसिड प्रोफ़ाइल हेतु अनाज और दालों का संयोजन',
    'Nutrition',
    'Why the traditional pairing of Dal-Chawal or Rajma-Chawal isn’t just comforting—it represents an ancient, biologically optimal amino acid complement.',
    'Clinical analysis of PDCAAS scoring for lentil and cereal pairings and their metabolic bioavailability.',
    'assets/images/nutrition-bowl.jpg',
    'Dr. Sunita Rao, PhD, Registered Dietitian',
    'PhD Clinical Nutrition, RD',
    '2026-10-18',
    TRUE
)
ON CONFLICT (id) DO NOTHING;
