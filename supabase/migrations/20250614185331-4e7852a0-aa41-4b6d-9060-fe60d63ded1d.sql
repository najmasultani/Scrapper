-- Disable RLS for development
ALTER TABLE public.restaurant_compost_listings DISABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view restaurant listings" ON public.restaurant_compost_listings;
DROP POLICY IF EXISTS "User can view their own restaurant listings" ON public.restaurant_compost_listings;
DROP POLICY IF EXISTS "User can insert their own restaurant listing" ON public.restaurant_compost_listings;
DROP POLICY IF EXISTS "User can update their own restaurant listing" ON public.restaurant_compost_listings;
DROP POLICY IF EXISTS "User can delete their own restaurant listing" ON public.restaurant_compost_listings;
