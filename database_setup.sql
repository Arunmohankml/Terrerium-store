-- Create Products Table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  series TEXT,
  description TEXT,
  price NUMERIC NOT NULL,
  image_url TEXT,
  stock INTEGER DEFAULT 10,
  is_featured BOOLEAN DEFAULT false,
  is_limited BOOLEAN DEFAULT false,
  category TEXT DEFAULT 'Aquascape Kits',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Orders Table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT,
  total_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending',
  shipping_address JSONB,
  payment_id TEXT,
  items JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE orders ADD COLUMN IF NOT EXISTS items JSONB DEFAULT '[]'::jsonb;

-- Seed Data (Aquaterra products)
INSERT INTO products (name, series, description, price, image_url, stock, is_featured, is_limited)
VALUES 
('Planted Nano Bowl Kit', 'Aquascape Kits', 'A complete glass bowl ecosystem with substrate, moss, and beginner aquatic plants.', 3499, '/images/terreriums/b0d89c565900942e26480170b5f46169.jpg', 12, true, false),
('Neon Tetra School Pack', 'Fish & Livestock', 'A carefully sourced group of peaceful neon tetras for planted tanks.', 2499, '/images/terreriums/861885c305078725c49155ea27e8fc90.jpg', 20, true, false),
('Planted Betta Habitat', 'Fish & Aquascape', 'A calm planted habitat designed for a single ornamental betta.', 4999, '/images/terreriums/861885c305078725c49155ea27e8fc90.jpg', 6, true, true),
('Low-Light Plant Bundle', 'Aquatic Plants', 'Six hardy aquatic plants selected for low-tech aquariums.', 1899, '/images/terreriums/c5e347b84e7fe6e8beed1580299f2bb2.jpg', 18, false, false),
('Terrarium Starter Set', 'Terrariums', 'A ready-to-style terrarium base with drainage, substrate, and accent hardscape.', 2999, '/images/terreriums/0a2fe810fce8f693f4a610543d741470.jpg', 10, false, false);

-- Create Settings Table
CREATE TABLE IF NOT EXISTS settings (
  id TEXT PRIMARY KEY,
  instagram_id TEXT DEFAULT 'aquaterra.ecosystems',
  contact_email TEXT DEFAULT 'care@aquaterra.in',
  contact_phone TEXT DEFAULT '+91 98765 43210',
  privacy_policy TEXT,
  refund_policy TEXT,
  terms_conditions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Initialize Settings
INSERT INTO settings (id, instagram_id, contact_email, contact_phone)
VALUES ('global', 'aquaterra.ecosystems', 'care@aquaterra.in', '+91 98765 43210')
ON CONFLICT (id) DO NOTHING;

-- Create Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY, -- Linked to Firebase User ID
  email TEXT,
  full_name TEXT,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  is_banned BOOLEAN DEFAULT false,
  is_admin BOOLEAN DEFAULT false,
  mock_ip TEXT DEFAULT '192.168.1.1'
);

-- Create Wishlist Table
CREATE TABLE IF NOT EXISTS wishlist (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Reports Table (Care Guard)
CREATE TABLE IF NOT EXISTS reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  user_id TEXT NOT NULL,
  full_name TEXT,
  email TEXT,
  category TEXT NOT NULL, -- Damaged, Wrong Item, Refund, etc.
  description TEXT,
  media_urls TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'pending', -- pending, under_review, resolved, etc.
  admin_reply TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Reports (Admin can see all, Users see their own)
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can see their own reports" ON reports
  FOR SELECT USING (user_id IS NOT NULL);

CREATE POLICY "Users can create reports" ON reports
  FOR INSERT WITH CHECK (user_id IS NOT NULL);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  email TEXT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe" ON newsletter_subscribers
  FOR INSERT WITH CHECK (char_length(email) > 3);
