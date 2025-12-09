import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';

import NavDetailProject from '../components/NavDetailProject';
import '../DetailProject.css';

const ProjectDetail = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
        const response = await axios.get(`${apiUrl}/api/projects/${id}`);
        setProject(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project:", error);
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (!project) return <div className="text-center py-5">Project not found</div>;

  return (
    <>
    <NavDetailProject theme={theme} toggleTheme={toggleTheme} />
    <div className="container py-5" style={{ marginTop: '80px' }}> {/* Margin agar tidak tertutup navbar */}
      
      {/* Tombol Kembali */}
      <Link to="/#projects" className="btn btn-outline-secondary text-body mb-4">
        <FaArrowLeft className="me-2" /> Kembali ke Home
      </Link>

      <div className="row">
        {/* KOLOM KIRI: Gambar & Info Dasar */}
        <div className="col-lg-5 mb-lg-0">
          <img 
            src={project.image_url} 
            alt={project.title} 
            className="img-fluid rounded-4 shadow mb-4 project-detail-img"
          />
          
          <h1 className="mb-3">{project.title}</h1>
          
          <div className="d-flex gap-2 mb-4">
            {project.repo_link && (
                <a href={project.repo_link} target="_blank" rel="noreferrer" className="btn btn-dark d-flex align-items-center gap-2">
                    <FaGithub /> Source Code
                </a>
            )}
            {project.live_link && (
                <a href={project.live_link} target="_blank" rel="noreferrer" className="btn btn-primary d-flex align-items-center gap-2">
                    <FaExternalLinkAlt /> Live Demo
                </a>
            )}
          </div>

          <div className="mb-4">
            <h5 className="fw-bold text-uppercase small mb-3">Tech Stack</h5>
            <div className="d-flex flex-wrap gap-2">
                {project.tech_stack && project.tech_stack.map((tech, i) => (
                    <span key={i} className="badge bg-light border py-2 px-3 badge-tech text-dark">{tech}</span>
                ))}
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: Detail Penjelasan (Case Study) */}
        <div className="col-lg-7 ps-lg-5">
          
          {/* Deskripsi Singkat */}
          <div className="mb-5">
            <h4 className="fw-bold border-bottom pb-2 mb-3">Tentang Project</h4>
            <p className="text-body-secondary">{project.description}</p>
          </div>

          {/* Latar Belakang */}
          {project.latar_belakang && (
            <div className="mb-5">
              <h5 className="fw-bold d-flex align-items-center">
                <i className="fas fa-lightbulb text-warning me-2"></i>Latar Belakang
            </h5>
              <p className="text-body-secondary">{project.latar_belakang}</p>
            </div>
          )}

          {/* Fitur Utama */}
          {project.fitur_utama && project.fitur_utama.length > 0 && (
            <div className="mb-5">
              <h5 className="fw-bold d-flex align-items-center">
                <i className="fas fa-star text-primary me-2"></i>Fitur Utama
            </h5>
              <ul className="list-group list-group-flush">
                {project.fitur_utama.map((fitur, i) => (
                    <li key={i} className="list-group-item bg-transparent px-0 py-2 feature-item">
                        <i class="fas fa-check-circle text-success me-2"></i>{fitur}
                    </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tantangan Teknis */}
          {project.tantangan_teknis && (
            <div className="mb-4">
              <h5 className="fw-bold text-danger d-flex align-items-center">
                <i class="fas fa-fire me-2"></i>Tantangan Teknis
            </h5>
                <div class="p-4 challenge-box border-start border-4 border-danger rounded">
                    <p className="mb-0">{project.tantangan_teknis}</p>
                </div>
            </div>
          )}
          
          {/* Catatan */}
          {project.catatan && (
            <div className="alert alert-info mt-5 d-flex align-items-center shadow-sm">
                <i class="fas fa-info-circle fa-2x me-3"></i>
                <div>
                    <strong>📝 Catatan:</strong> <br />
                    {project.catatan}
                </div>
            </div>
          )}

        </div>
      </div>
    </div>
    </>
  );
};

export default ProjectDetail;