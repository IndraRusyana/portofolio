import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard';

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // ... (Bagian Fetch API tetap sama) ...
  const fetchProjects = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080'; 
      const response = await axios.get(`${apiUrl}/api/projects`);
      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
    {/* 1. Ganti bg-light jadi bg-body-tertiary (Adaptif Dark/Light) */}
    <section id="projects" className="py-5 bg-body-tertiary">
        <div className="container py-5">
            
            {/* Header: Tambahkan text-center di mobile, text-md-start di desktop */}
            <div className="mb-5 text-center text-md-start">
                <h6 className="fw-bold text-uppercase" style={{color:'#6610f2'}}>Portfolio</h6>
                <h2 className="fw-bold display-6">Featured Projects</h2>
            </div>

            <div className="row g-4">
                {projects.map((project) => (
                    // 2. Grid Responsive: 
                    // col-12 (HP: 1 kolom)
                    // col-md-6 (Tablet: 2 kolom)
                    // col-lg-4 (Laptop: 3 kolom)
                    <div className="col-12 col-md-6 col-lg-4" key={project.id}>
                        <ProjectCard project={project} />
                    </div>
                ))}
            </div>
        </div>
    </section>
    </>
  );
};

export default Project;