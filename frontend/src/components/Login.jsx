import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      navigate('/', { replace: true });
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post('https://mail-app-b1.vercel.app/api/login', form);
      login(data.token);
      navigate('/', { replace: true });
    } catch {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: 'linear-gradient(135deg, #4361ee, #3a0ca3)'
    }}>
      <div style={{
        background: '#fff', borderRadius: 16, padding: '40px 36px',
        width: 360, boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
      }}>
        <h2 style={{ textAlign: 'center', color: '#4361ee', marginBottom: 8 }}>✉️ BulkMail</h2>
        <p style={{ textAlign: 'center', color: '#718096', marginBottom: 28, fontSize: 14 }}>
          Admin Login
        </p>

        {error && (
          <div style={{
            background: '#fff5f5', border: '1px solid #fc8181',
            borderRadius: 8, padding: '10px 14px', marginBottom: 16,
            color: '#c53030', fontSize: 13
          }}>{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#4a5568' }}>
              Username
            </label>
            <input
              type="text" placeholder="admin"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#4a5568' }}>
              Password
            </label>
            <input
              type="password" placeholder="admin123"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            style={{ width: '100%', background: '#4361ee', color: '#fff', padding: '12px' }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={{ marginTop: 20, textAlign: 'center', fontSize: 12, color: '#a0aec0' }}>
          Default: admin / admin123
        </p>
      </div>
    </div>
  );
}
