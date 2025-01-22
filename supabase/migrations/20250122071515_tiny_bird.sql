/*
  # Portfolio Website Schema

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `image_url` (text)
      - `technologies` (text[])
      - `live_url` (text)
      - `github_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `image_url` (text)
      - `published` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `message` (text)
      - `created_at` (timestamp)
      - `read` (boolean)

  2. Security
    - Enable RLS on all tables
    - Public read access for projects and published blog posts
    - Admin-only write access for all tables
    - Admin-only read access for contact messages
*/

-- Projects Table
CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  technologies text[] DEFAULT '{}',
  live_url text,
  github_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Blog Posts Table
CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  image_url text,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Contact Messages Table
CREATE TABLE contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  read boolean DEFAULT false
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Projects Policies
CREATE POLICY "Allow public read access to projects"
  ON projects FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin full access to projects"
  ON projects
  TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Blog Posts Policies
CREATE POLICY "Allow public read access to published blog posts"
  ON blog_posts FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Allow admin full access to blog posts"
  ON blog_posts
  TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Contact Messages Policies
CREATE POLICY "Allow public to create contact messages"
  ON contact_messages FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow admin full access to contact messages"
  ON contact_messages
  TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');