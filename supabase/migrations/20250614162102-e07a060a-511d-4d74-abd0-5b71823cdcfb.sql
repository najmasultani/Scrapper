
-- Create a table for gardener/farmer registrations
CREATE TABLE public.gardener_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID, -- will store supabase user id (not a foreign key)
  garden_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  compost_type TEXT NOT NULL,
  availability_type TEXT NOT NULL, -- 'pickup' or 'delivery'
  available_dates DATE[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable RLS for privacy
ALTER TABLE public.gardener_profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to manage their own record
CREATE POLICY "Gardener can read their own profile"
  ON public.gardener_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Gardener can insert their own profile"
  ON public.gardener_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Gardener can update their own profile"
  ON public.gardener_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Gardener can delete their own profile"
  ON public.gardener_profiles FOR DELETE
  USING (auth.uid() = user_id);
