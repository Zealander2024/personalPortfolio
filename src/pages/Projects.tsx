import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  technologies: string[];
  live_url: string;
  github_url: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        setProjects(data || []);
      }
      setLoading(false);
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">My Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {project.image_url && (
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{project.title}</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 sm:px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs sm:text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center text-indigo-600 hover:text-indigo-700 text-sm sm:text-base"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Live Demo
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center text-gray-600 hover:text-gray-700 text-sm sm:text-base"
                  >
                    <Github className="h-4 w-4 mr-1" />
                    Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}