import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function SendMail() {
  const [form, setForm] = useState({ subject: '', recipients: '', body: '' });
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    setError('');
    try {
      const recipients = form.recipients.split(',').map(r => r.trim()).filter(Boolean);
      await axios.post(
        'https://mail-app-sable.vercel.app/api/emails/send',
        { subject: form.subject, body: form.body, recipients },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStatus('Emails sent successfully!');
      setForm({ subject: '', recipients: '', body: '' });
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fb', padding: '2rem 1rem', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        <div style={{ background: 'linear-gradient(135deg, #6c63ff, #9b8fff)', padding: '2rem', color: '#fff' }}>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '600' }}>📧 Send Bulk Email</h2>
          <p style={{ margin: '4px 0 0', opacity: 0.8, fontSize: '14px' }}>Compose and send to multiple recipients at once</p>
        </div>

        <div style={{ padding: '2rem' }}>
          {status && (
            <div style={{ background: '#e8f5e9', border: '1px solid #a5d6a7', borderRadius: '8px', padding: '12px 16px', marginBottom: '1.5rem', color: '#2e7d32', fontSize: '14px' }}>
              ✅ {status}
            </div>
          )}
          {error && (
            <div style={{ background: '#ffebee', border: '1px solid #ef9a9a', borderRadius: '8px', padding: '12px 16px', marginBottom: '1.5rem', color: '#c62828', fontSize: '14px' }}>
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '6px' }}>Subject</label>
              <input
                type="text"
                placeholder="Enter email subject"
                value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })}
                required
                style={{ width: '100%', padding: '11px 14px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '6px' }}>Recipients</label>
              <input
                type="text"
                placeholder="email1@gmail.com, email2@gmail.com"
                value={form.recipients}
                onChange={e => setForm({ ...form, recipients: e.target.value })}
                required
                style={{ width: '100%', padding: '11px 14px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              />
              <p style={{ fontSize: '12px', color: '#999', margin: '5px 0 0' }}>Separate multiple emails with commas</p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '6px' }}>Email Body</label>
              <textarea
                placeholder="Write your email content here..."
                value={form.body}
                onChange={e => setForm({ ...form, body: e.target.value })}
                required
                rows={8}
                style={{ width: '100%', padding: '11px 14px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="submit"
                disabled={loading}
                style={{ flex: 1, padding: '13px', background: 'linear-gradient(135deg, #6c63ff, #9b8fff)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Sending...' : '🚀 Send Emails'}
              </button>
              <button
                type="button"
                onClick={() => setForm({ subject: '', recipients: '', body: '' })}
                style={{ padding: '13px 24px', background: '#f5f5f5', color: '#555', border: 'none', borderRadius: '8px', fontSize: '15px', cursor: 'pointer' }}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}