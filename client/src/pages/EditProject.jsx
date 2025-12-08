import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

const EditProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // State Data
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [techStack, setTechStack] = useState('');
  const [repoLink, setRepoLink] = useState('');
  const [liveLink, setLiveLink] = useState('');
  const [currentImage, setCurrentImage] = useState(''); 
  const [latarBelakang, setLatarBelakang] = useState('');
  const [tantanganTeknis, setTantanganTeknis] = useState('');
  const [fiturUtama, setFiturUtama] = useState('');
  const [catatan, setCatatan] = useState('');
  
  // State File Baru
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${apiUrl}/api/projects/${id}`);
        const data = response.data;

        // Populate State
        setTitle(data.title || '');
        setDescription(data.description || '');
        // Pastikan konversi Array ke String aman
        setTechStack(data.tech_stack ? data.tech_stack.join(', ') : '');
        setRepoLink(data.repo_link || '');
        setLiveLink(data.live_link || '');
        setCurrentImage(data.image_url || '');
        setLatarBelakang(data.latar_belakang || '');
        setTantanganTeknis(data.tantangan_teknis || '');
        setFiturUtama(data.fitur_utama ? data.fitur_utama.join(', ') : '');
        setCatatan(data.catatan || '');
        
      } catch (error) {
        console.error("Error fetching project:", error);
        alert("Gagal mengambil data project. Pastikan ID benar.");
      }
    };
    fetchProject();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    console.log("Tombol Update ditekan..."); // DEBUG 1

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Token tidak ditemukan, silakan login ulang.");
        return;
      }

      const formData = new FormData();
      
      // Append Data Teks
      formData.append('title', title);
      formData.append('description', description);
      formData.append('repo_link', repoLink);
      formData.append('live_link', liveLink);
      formData.append('latar_belakang', latarBelakang);
      formData.append('tantangan_teknis', tantanganTeknis);
      formData.append('catatan', catatan);
      
      // --- PERBAIKAN SINTAKS BACKTICK (`) DI SINI ---
      
      // Format Fitur Utama: `{Login, Logout}`
      const formattedFitur = fiturUtama ? `{${fiturUtama}}` : '{}';
      formData.append('fitur_utama', formattedFitur);

      // Format Tech Stack: `{React, Node}`
      const formattedTechStack = techStack ? `{${techStack}}` : '{}';
      formData.append('tech_stack', formattedTechStack);

      // ----------------------------------------------

      // Hanya append jika ada file baru
      if (file) {
        formData.append('image', file);
      }

      // DEBUGGING: Cek isi amplop sebelum dikirim
      console.log("Mengirim data ke Backend...");
      for (let [key, value] of formData.entries()) {
           console.log(`${key}:`, value);
      }

      // Kirim Request
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.put(`${apiUrl}/api/projects/${id}`, formData, {
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      });

      console.log("Update Berhasil!");
      alert("Project berhasil di-update!");
      navigate('/admin');

    } catch (error) {
      console.error("Error saat submit:", error);
      // Tampilkan pesan error spesifik jika ada
      const errMsg = error.response?.data?.error || error.message;
      alert(`Gagal update project: ${errMsg}`);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Edit Project</h4>
              <Link to="/admin" className="btn btn-light btn-sm">Cancel</Link>
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
                  <input type="text" className="form-control" value={techStack} onChange={(e) => setTechStack(e.target.value)} required />
                  <div className="form-text">Pisahkan dengan koma.</div>
                </div>

                {/* FITUR UTAMA */}
                <div className="mb-3">
                  <label className="form-label">Fitur Utama</label>
                  <input type="text" className="form-control" placeholder="Login, Dashboard, Export PDF" value={fiturUtama} onChange={(e) => setFiturUtama(e.target.value)} />
                  <div className="form-text">Pisahkan dengan koma.</div>
                </div>

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

                {/* GAMBAR */}
                <div className="mb-3">
                  <label className="form-label">Project Image</label>
                  {currentImage && (
                    <div className="mb-2">
                        <img src={currentImage} alt="Current" className="img-thumbnail" style={{ height: '100px' }} />
                        <p className="text-muted small">Gambar saat ini</p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    className="form-control" 
                    onChange={(e) => setFile(e.target.files[0])} 
                    accept="image/*"
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Repo Link</label>
                    <input type="text" className="form-control" value={repoLink} onChange={(e) => setRepoLink(e.target.value)} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Live Link</label>
                    <input type="text" className="form-control" value={liveLink} onChange={(e) => setLiveLink(e.target.value)} />
                  </div>
                </div>

                <button type="submit" className="btn btn-warning w-100 mt-3">Update Project</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProject;