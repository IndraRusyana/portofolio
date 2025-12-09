import React from 'react';
import { FaGithub } from 'react-icons/fa'; // Link Router tidak perlu diimport di sini jika tidak dipakai di luar return
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  return (
    <div className="card h-100 shadow-sm border-0 project-card"> {/* Tambah class custom project-card */}
      
      {/* Gambar Project */}
      <div className="position-relative overflow-hidden">
        {/* <Link to={`/projects/${project.id}`}> */}
          {/* 1. CSS Class untuk gambar agar seragam */}
          <img 
            src={project.image_url || "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
            className="card-img-top project-card-img" 
            alt={project.title} 
          />
        {/* </Link> */}
      </div>

      <div className="card-body p-4 d-flex flex-column"> {/* Flex column agar footer terdorong ke bawah */}
        <h5 className="card-title fw-bold mb-3">
            <Link to={`/projects/${project.id}`} className="text-decoration-none text-body">
                {project.title}
            </Link>
        </h5>
        
        <p className="card-text text-muted mb-4 small">
            {/* Potong deskripsi jika terlalu panjang agar card rata */}
            {project.description.length > 100 
                ? project.description.substring(0, 100) + "..." 
                : project.description}
        </p>

        {/* Tech Stack Badges */}
        <div className="d-flex flex-wrap gap-2 mt-auto"> {/* mt-auto dorong ini ke bawah */}
            {project.tech_stack.map((tech, index) => (
            <span key={index} className="badge badge-tech-home border fw-bolder">
                {tech}
            </span>
            ))}
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="card-footer bg-transparent border-0 p-4 pt-0">
          <hr className="text-muted opacity-25" />
          <div className="d-flex justify-content-between align-items-center">
              <a href={project.repo_link} target="_blank" rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-dark d-flex align-items-center gap-2">
                  <FaGithub /> <span className="d-none d-sm-inline">Repository</span> {/* Teks sembunyi di HP sangat kecil */}
              </a>
              <a href={project.live_link} target="_blank" rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-dark d-flex align-items-center gap-2">
                  Live Demo <i className="fas fa-external-link-alt"></i>
              </a>
          </div>
      </div>
    </div>
  );
};

export default ProjectCard;