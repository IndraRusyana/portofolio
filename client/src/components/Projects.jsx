import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard';

const Project = () => {
    const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'; // Fallback
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
    <section id="projects" className="py-5 bg-light">
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-end mb-5">
                <div>
                    <h6 className="fw-bold text-uppercase" style={{color:'#6610f2'}}>Portfolio</h6>
                    <h2 className="fw-bold display-6">Featured Projects</h2>
                </div>
                {/* <a href="#" className="btn btn-link text-decoration-none fw-bold">Lihat Semua <i className="fas fa-arrow-right ms-1"></i></a> */}
            </div>

            <div className="row g-4">
                {projects.map((project) => (
                    <div className="col-md-4" key={project.id}>
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
