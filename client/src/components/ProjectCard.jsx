import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
return (
<div className="card h-100 shadow-sm">
    {/* Gambar Project dengan inline style agar tinggi seragam */}
    <div className="position-relative overflow-hidden">
      <Link to={`/projects/${project.id}`}>
        <img src={project.image_url
            || "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            } className="card-img-top project-card-img" alt={project.title} />
        {/* <div className="position-absolute top-0 end-0 m-3">
            <span className="badge text-dark shadow-sm">Fullstack</span>
        </div> */}
      </Link>
    </div>

    <div className="card-body p-4">
        <h5 className="card-title fw-bold mb-3">{project.title}</h5>
        <p className="card-text text-muted mb-4">
            {project.description}
        </p>

        {/* Tech Stack Badges */}
        <div className="d-flex flex-wrap gap-2">
            {project.tech_stack.map((tech, index) => (
            <span key={index} className="badge badge-tech-home">
                {tech}
            </span>
            ))}
        </div>

        {/* Tombol Action (ditaruh di bawah agar rata) */}
        <div className="card-footer border-0 p-4 pt-0">
            <hr className="text-muted opacity-25" />
            <div className="d-flex justify-content-between align-items-center">
                <a href={project.repo_link} target="_blank" rel="noopener noreferrer"
                    className="text-body text-decoration-none fw-bold small"><i className="fab fa-github me-1"></i>
                    Repository</a>
                <a href={project.live_link} target="_blank" rel="noopener noreferrer"
                    className="text-body text-decoration-none fw-bold small">Live Demo <i
                        className="fas fa-external-link-alt ms-1"></i></a>
            </div>
        </div>
    </div>
</div>
);
};

export default ProjectCard;
