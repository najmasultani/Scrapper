
-- Add 'amount' (numeric, in kg) to restaurant listings
ALTER TABLE public.restaurant_compost_listings
ADD COLUMN amount numeric;

-- Add 'amount' (numeric, in kg) to gardener profiles (represents how much compost wanted/needed)
ALTER TABLE public.gardener_profiles
ADD COLUMN amount numeric;
