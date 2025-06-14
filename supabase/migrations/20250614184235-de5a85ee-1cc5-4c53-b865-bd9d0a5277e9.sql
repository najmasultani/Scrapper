
-- Create a storage bucket for restaurant images in Supabase, make it public
insert into storage.buckets (id, name, public)
values ('restaurant-images', 'restaurant-images', true)
on conflict (id) do nothing;
