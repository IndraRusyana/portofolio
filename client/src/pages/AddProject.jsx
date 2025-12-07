import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const AddProject = () => {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [techStack, setTechStack] = useState('');
  const [repoLink, setRepoLink] = useState('');
  const [liveLink, setLiveLink] = useState('');
  const [latarBelakang, setLatarBelakang] = useState('');
  const [tantanganTeknis, setTantanganTeknis] = useState('');
  const [fiturUtama, setFiturUtama] = useState(''); // State untuk fitur utama
  const [catatan, setCatatan] = useState('');
  
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      formData.append('title', title);
      formData.append('description', description);
      formData.append('repo_link', repoLink);
      formData.append('live_link', liveLink);
      formData.append('latar_belakang', latarBelakang);
      formData.append('tantangan_teknis', tantanganTeknis);
      formData.append('catatan', catatan);
      
      // --- PERBAIKAN DI SINI ---
      
      // 1. Format Tech Stack (String -> Array Postgres)
      const formattedTechStack = techStack ? `{${techStack}}` : '{}';
      formData.append('tech_stack', formattedTechStack);

      // 2. Format Fitur Utama (String -> Array Postgres)
      // PENTING: Harus dibungkus kurung kurawal {} agar dianggap Array oleh Postgres
      const formattedFitur = fiturUtama ? `{${fiturUtama}}` : '{}';
      formData.append('fitur_utama', formattedFitur);

      // -------------------------

      if (file) {
        formData.append('image', file);
      }

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.post(`${apiUrl}/api/projects`, formData, {
        headers: { 
          token: token,
        }
      });

      alert("Project berhasil ditambahkan!");
      navigate('/admin');

    } catch (error) {
      console.error(error);
      alert("Gagal menambah project. Cek console untuk detail.");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Add New Project</h4>
              <Link to="/admin" className="btn btn-light btn-sm">Back</Link>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                  <label className="form-label">Project Title</label>
                  <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Tech Stack</label>
                  <input type="text" className="form-control" placeholder="React, Node.js, PostgreSQL" value={techStack} onChange={(e) => setTechStack(e.target.value)} required />
                  <div className="form-text">Pisahkan dengan koma.</div>
                </div>

                {/* --- INPUT BARU UNTUK FITUR UTAMA --- */}
                <div className="mb-3">
                  <label className="form-label">Fitur Utama</label>
                  <input type="text" className="form-control" placeholder="Login, Dashboard, Export PDF" value={fiturUtama} onChange={(e) => setFiturUtama(e.target.value)} />
                  <div className="form-text">Pisahkan dengan koma.</div>
                </div>
                {/* ------------------------------------ */}

                <div className="mb-3">
                  <label className="form-label">Latar Belakang</label>
                  <textarea className="form-control" rows="3" value={latarBelakang} onChange={(e) => setLatarBelakang(e.target.value)}></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Tantangan Teknis</label>
                  <textarea className="form-control" rows="3" value={tantanganTeknis} onChange={(e) => setTantanganTeknis(e.target.value)}></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Catatan</label>
                  <textarea className="form-control" rows="3" value={catatan} onChange={(e) => setCatatan(e.target.value)}></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Upload Thumbnail</label>
                  <input type="file" className="form-control" onChange={handleFileChange} accept="image/*" />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Repository Link</label>
                    <input type="text" className="form-control" value={repoLink} onChange={(e) => setRepoLink(e.target.value)} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Live Demo Link</label>
                    <input type="text" className="form-control" value={liveLink} onChange={(e) => setLiveLink(e.target.value)} />
                  </div>
                </div>

                <button type="submit" className="btn btn-success w-100 mt-3">Save Project</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProject;