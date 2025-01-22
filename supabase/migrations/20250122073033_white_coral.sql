/*
  # Create storage buckets for portfolio assets

  1. New Storage Buckets
    - `portfolio`: For storing project and blog images
      - Public access enabled
      - Max file size: 5MB
      - Allowed mime types: images only

  2. Security
    - Enable public read access
    - Allow authenticated users to upload files
*/

-- Create the portfolio bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio', 'portfolio', true);

-- Set bucket configuration
UPDATE storage.buckets
SET file_size_limit = 5242880, -- 5MB
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
WHERE id = 'portfolio';

-- Allow public read access to files
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'portfolio');

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'portfolio');

-- Allow authenticated users to delete their files
CREATE POLICY "Authenticated users can delete files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'portfolio');