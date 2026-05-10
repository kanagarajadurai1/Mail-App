import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { logout } = useAuth();
  const { pathname } = useLocation();

  const linkStyle = (path) => ({
    textDecoration: 'none',
    color: pathname === path ? '#4361ee' : '#4a5568',
    fontWeight: pathname === path ? 700 : 500,
    fontSize: 14,
    padding: '6px 14px',
    borderRadius: 8,
    background: pathname === path ? '#ebf0ff' : 'transparent',
  });

  return (
    <nav style={{
      background: '#fff', padding: '14px 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 10
    }}>
      <span style={{ fontWeight: 800, fontSize: 18, color: '#4361ee' }}>✉️ BulkMail</span>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Link to="/" style={linkStyle('/')}>Send Mail</Link>
        <Link to="/history" style={linkStyle('/history')}>History</Link>
        <button
          onClick={logout}
          style={{ background: '#fff1f1', color: '#e53e3e', marginLeft: 8 }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}