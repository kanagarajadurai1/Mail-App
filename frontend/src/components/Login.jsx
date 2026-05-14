import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post('https://mail-app-sable.vercel.app/api/login', form);
      login(data.token);
      navigate('/send');
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0b0c10',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=Playfair+Display:wght@400;500&display=swap');
        .lp-grid-bg {
          position: fixed; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }
        .lp-orb {
          position: fixed; border-radius: 50%;
          filter: blur(80px); opacity: 0.15;
          animation: orbFloat 8s ease-in-out infinite;
          pointer-events: none;
        }
        .lp-orb1 { width: 500px; height: 500px; background: #6c63ff; top: -150px; left: -100px; }
        .lp-orb2 { width: 350px; height: 350px; background: #00e5ff; bottom: -80px; right: -60px; animation-delay: 3s; }
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        .lp-card { animation: cardIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .lp-badge    { animation: fadeUp 0.6s 0.2s both; }
        .lp-title    { animation: fadeUp 0.6s 0.3s both; }
        .lp-sub      { animation: fadeUp 0.6s 0.4s both; }
        .lp-f1       { animation: fadeUp 0.6s 0.45s both; }
        .lp-f2       { animation: fadeUp 0.6s 0.52s both; }
        .lp-btn-wrap { animation: fadeUp 0.6s 0.6s both; }
        .lp-hint     { animation: fadeUp 0.6s 0.7s both; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .lp-dot { animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.7); }
        }
        .lp-input {
          width: 100%;
          background: rgba(255,255,255,0.06);
          border: 0.5px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 12px 14px 12px 42px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #f0eeff;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .lp-input::placeholder { color: rgba(255,255,255,0.2); }
        .lp-input:focus {
          border-color: rgba(108,99,255,0.6);
          background: rgba(108,99,255,0.08);
          box-shadow: 0 0 0 4px rgba(108,99,255,0.12);
        }
        .lp-btn {
          width: 100%; padding: 13px;
          background: linear-gradient(135deg, #6c63ff 0%, #9b8fff 100%);
          border: none; border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 500; color: #fff;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: transform 0.15s, box-shadow 0.2s;
          position: relative; overflow: hidden;
        }
        .lp-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(108,99,255,0.4); }
        .lp-btn:active { transform: scale(0.99); }
        .lp-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
      `}</style>

      <div className="lp-grid-bg" />
      <div className="lp-orb lp-orb1" />
      <div className="lp-orb lp-orb2" />

      <div className="lp-card" style={{
        position: 'relative', width: '100%', maxWidth: '400px',
        background: 'rgba(255,255,255,0.04)',
        border: '0.5px solid rgba(255,255,255,0.1)',
        borderRadius: '20px', padding: '2.5rem 2rem',
        backdropFilter: 'blur(20px)', margin: '1rem',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
          borderRadius: '20px 20px 0 0',
        }} />

        <div className="lp-badge" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'rgba(108,99,255,0.15)',
          border: '0.5px solid rgba(108,99,255,0.35)',
          borderRadius: '100px', padding: '5px 14px',
          fontSize: '11px', fontWeight: '500', color: '#a89eff',
          letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.5rem',
        }}>
          <div className="lp-dot" style={{ width: '6px', height: '6px', background: '#a89eff', borderRadius: '50%' }} />
          Admin Portal
        </div>

        <h1 className="lp-title" style={{
          fontFamily: "'Playfair Display', serif", fontSize: '28px',
          fontWeight: '500', color: '#f0eeff', margin: '0 0 0.4rem', lineHeight: '1.2',
        }}>Welcome back</h1>

        <p className="lp-sub" style={{
          fontSize: '13px', color: 'rgba(255,255,255,0.35)',
          margin: '0 0 2rem', fontWeight: '300',
        }}>Sign in to your BulkMail dashboard</p>

        <form onSubmit={handleSubmit}>
          <div className="lp-f1" style={{ marginBottom: '1.1rem' }}>
            <label style={{
              fontSize: '11px', fontWeight: '500', color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase', letterSpacing: '0.1em',
              display: 'block', marginBottom: '8px',
            }}>Username</label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', left: '14px', top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(255,255,255,0.25)', fontSize: '16px', pointerEvents: 'none',
              }}>👤</span>
              <input
                className="lp-input"
                type="text"
                placeholder="admin"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
              />
            </div>
          </div>

          <div className="lp-f2" style={{ marginBottom: '1.1rem' }}>
            <label style={{
              fontSize: '11px', fontWeight: '500', color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase', letterSpacing: '0.1em',
              display: 'block', marginBottom: '8px',
            }}>Password</label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', left: '14px', top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(255,255,255,0.25)', fontSize: '16px', pointerEvents: 'none',
              }}>🔒</span>
              <input
                className="lp-input"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
              />
            </div>
          </div>

          {error && (
            <p style={{ color: '#ff6b6b', fontSize: '13px', marginBottom: '1rem', textAlign: 'center' }}>
              {error}
            </p>
          )}

          <div className="lp-btn-wrap">
            <button className="lp-btn" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in →'}
            </button>
          </div>
        </form>

        <div className="lp-hint" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '6px', marginTop: '1.5rem',
          fontSize: '12px', color: 'rgba(255,255,255,0.2)',
        }}>
          🛡 admin / admin123 · JWT secured
        </div>
      </div>
    </div>
  );
}