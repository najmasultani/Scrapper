-- Create a storage bucket for restaurant images in Supabase, make it public
insert into storage.buckets (id, name, public)
values ('restaurant-images', 'restaurant-images', true)
on conflict (id) do nothing;

-- Create a permissive policy for the restaurant-images bucket
CREATE POLICY "Allow all operations on restaurant-images"
ON storage.objects
FOR ALL
USING (bucket_id = 'restaurant-images')
WITH CHECK (bucket_id = 'restaurant-images');
