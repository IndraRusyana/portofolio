import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// Import CSS
import '../Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
      const response = await axios.post(`${apiUrl}/api/auth/login`, {
        username,
        password
      });

      // 1. Simpan Token di LocalStorage
      localStorage.setItem('token', response.data.token);

      // 2. Redirect ke Dashboard
      navigate('/admin');
      
    } catch (err) {
      setError('Username atau Password salah!');
    }
  };

  return (
    <section className="login-wrapper">
        <div className="login-card position-relative">

            <button 
                onClick={toggleTheme}
                className="btn btn-sm btn-outline-secondary position-absolute top-0 end-0 m-3 rounded-circle z-3"
                style={{width: '32px', height: '32px', padding: 0}}
            >
                <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
            
            <div className="login-image">
                <div className="img-overlay">
                    <h2 className="fw-bold">Welcome Back!</h2>
                    <p className="mb-0 opacity-75">Kelola dashboard portfolio dan project Anda dengan mudah dalam satu tempat.</p>
                </div>
            </div>

            <div className="login-form-container">
                <a href="#" className="brand-logo text-decoration-none">
                    <i className="fas fa-layer-group me-2"></i>DevFolio<span className="brand">Admin</span>
                </a>

                <h3 className="fw-bold mb-1">Masuk Akun</h3>
                <p className="text-muted mb-4 small">Silakan masukkan kredensial Anda untuk melanjutkan.</p>

                {error && (
                    <div className="alert alert-danger py-2 small border-0 shadow-sm fade show">
                        <i className="fas fa-exclamation-circle me-2"></i> {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-muted">Username / Email</label>
                        <div className="input-group">
                            <span className="input-group-text border-0"><i className="fas fa-user text-muted"></i></span>
                            <input 
                                type="text" 
                                className="form-control border-0" 
                                placeholder="Masukkan username admin" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} 
                                required />
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="d-flex justify-content-between">
                            <label className="form-label small fw-bold text-muted">Password</label>
                            <a href="#" className="small text-decoration-none text-primary">Lupa Password?</a>
                        </div>
                        <div className="input-group">
                            <span className="input-group-text border-0"><i className="fas fa-lock text-muted"></i></span>
                            <input 
                                type="password" 
                                className="form-control border-0" 
                                placeholder="Masukkan password Anda" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required />
                        </div>
                    </div>

                    {/* Tombol dengan Loading State */}
                    <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Memproses...
                            </>
                        ) : (
                            <>
                                Login Dashboard <i className="fas fa-arrow-right ms-2"></i>
                            </>
                        )}
                    </button>

                    <div className="text-center">
                        <small className="text-muted">Kembali ke <Link to="/" className="text-primary fw-bold text-decoration-none">Halaman Utama</Link></small>
                    </div>

                </form>
            </div>

        </div>
    </section>

  );
};

export default Login;