
-- Enable RLS for privacy
ALTER TABLE public.restaurant_compost_listings ENABLE ROW LEVEL SECURITY;

-- Allow users to SELECT their own listings
CREATE POLICY "User can view their own restaurant listings"
  ON public.restaurant_compost_listings FOR SELECT
  USING (auth.uid() = user_id);

-- Allow users to INSERT their own listings
CREATE POLICY "User can insert their own restaurant listing"
  ON public.restaurant_compost_listings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow users to UPDATE their own listings
CREATE POLICY "User can update their own restaurant listing"
  ON public.restaurant_compost_listings FOR UPDATE
  USING (auth.uid() = user_id);

-- Allow users to DELETE their own listings
CREATE POLICY "User can delete their own restaurant listing"
  ON public.restaurant_compost_listings FOR DELETE
  USING (auth.uid() = user_id);
