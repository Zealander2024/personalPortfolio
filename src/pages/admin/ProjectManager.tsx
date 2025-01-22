import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Save, Upload, X } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  technologies: string[];
  live_url: string;
  github_url: string;
}

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    description: '',
    technologies: [],
    live_url: '',
    github_url: '',
  });
  const [techInput, setTechInput] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

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

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `project-images/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('portfolio').getPublicUrl(filePath);
      
      setNewProject({
        ...newProject,
        image_url: data.publicUrl
      });
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    const { data, error } = await supabase
      .from('projects')
      .insert([newProject])
      .select();

    if (error) {
      console.error('Error creating project:', error);
    } else {
      setProjects([...(data || []), ...projects]);
      setNewProject({
        title: '',
        description: '',
        technologies: [],
        live_url: '',
        github_url: '',
      });
    }
  }

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project:', error);
    } else {
      setProjects(projects.filter(project => project.id !== id));
    }
  }

  function handleAddTechnology(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault();
      setNewProject({
        ...newProject,
        technologies: [...(newProject.technologies || []), techInput.trim()]
      });
      setTechInput('');
    }
  }

  function handleRemoveTechnology(index: number) {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies?.filter((_, i) => i !== index)
    });
  }

  if (loading) {
    return <div className="p-8 text-center">Loading projects...</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Add New Project</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6 mb-12">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Image
          </label>
          <div className="flex items-center space-x-4">
            {newProject.image_url && (
              <img
                src={newProject.image_url}
                alt="Project preview"
                className="h-20 w-20 object-cover rounded"
              />
            )}
            <label className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
              <Upload className="h-5 w-5 inline-block mr-2" />
              {uploading ? 'Uploading...' : 'Upload Image'}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={newProject.title}
            onChange={e => setNewProject({ ...newProject, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={newProject.description}
            onChange={e => setNewProject({ ...newProject, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Technologies
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {newProject.technologies?.map((tech, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => handleRemoveTechnology(index)}
                  className="ml-2 text-indigo-600 hover:text-indigo-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={techInput}
            onChange={e => setTechInput(e.target.value)}
            onKeyDown={handleAddTechnology}
            placeholder="Type and press Enter to add"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Live URL
          </label>
          <input
            type="url"
            value={newProject.live_url}
            onChange={e => setNewProject({ ...newProject, live_url: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GitHub URL
          </label>
          <input
            type="url"
            value={newProject.github_url}
            onChange={e => setNewProject({ ...newProject, github_url: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Project
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-6">Existing Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(project => (
          <div key={project.id} className="border rounded-lg p-4">
            {project.image_url && (
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
                >
                  {tech}
                </span>
              ))}
            </div>
            <button
              onClick={() => handleDelete(project.id)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}