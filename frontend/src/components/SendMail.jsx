import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function SendMail() {
  const { token } = useAuth();
  const [form, setForm] = useState({ subject: '', body: '', recipients: '' });
  const [status, setStatus] = useState(null); // { type: 'success'|'error', msg }
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!form.subject.trim()) return 'Subject is required';
    if (!form.body.trim()) return 'Email body is required';
    const emails = form.recipients.split(',').map(e => e.trim()).filter(Boolean);
    if (!emails.length) return 'At least one recipient is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    for (const e of emails) {
      if (!emailRegex.test(e)) return `Invalid email: ${e}`;
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setStatus({ type: 'error', msg: err }); return; }

    setLoading(true);
    setStatus(null);
    const recipients = form.recipients.split(',').map(e => e.trim()).filter(Boolean);

    try {
      const { data } = await axios.post(
        'https://mail-app-b1.vercel.app/api/emails/send',
        { ...form, recipients },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStatus({ type: 'success', msg: data.message, url: data.previewURL });
      setForm({ subject: '', body: '', recipients: '' });
    } catch (error) {
      setStatus({ type: 'error', msg: error.response?.data?.message || 'Something went wrong' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 680, margin: '40px auto', padding: '0 20px' }}>
      <div style={{
        background: '#fff', borderRadius: 16,
        boxShadow: '0 4px 20px rgba(0,0,0,0.07)', overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #4361ee, #7209b7)', padding: '24px 32px' }}>
          <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 700 }}>📨 Send Bulk Email</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, marginTop: 4 }}>
            Compose and send to multiple recipients at once
          </p>
        </div>

        {/* Form */}
        <div style={{ padding: '32px' }}>
          {status && (
            <div style={{
              padding: '12px 16px', borderRadius: 8, marginBottom: 20, fontSize: 14,
              background: status.type === 'success' ? '#f0fff4' : '#fff5f5',
              border: `1px solid ${status.type === 'success' ? '#68d391' : '#fc8181'}`,
              color: status.type === 'success' ? '#276749' : '#c53030',
            }}>
              {status.type === 'success' ? '✅' : '❌'} {status.msg}
              {status.url && (
                <div style={{ marginTop: 8 }}>
                  <a href={status.url} target="_blank" rel="noreferrer"
                    style={{ color: '#4361ee', fontWeight: 600, fontSize: 13 }}>
                    👁 Click here to view sent email
                  </a>
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Subject</label>
              <input
                type="text"
                placeholder="Enter email subject..."
                value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Recipients</label>
              <input
                type="text"
                placeholder="email1@example.com, email2@example.com"
                value={form.recipients}
                onChange={e => setForm({ ...form, recipients: e.target.value })}
              />
              <p style={{ fontSize: 12, color: '#a0aec0', marginTop: 5 }}>
                Separate multiple emails with commas
              </p>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Email Body</label>
              <textarea
                rows={8}
                placeholder="Write your email content here... HTML is supported!"
                value={form.body}
                onChange={e => setForm({ ...form, body: e.target.value })}
                style={{ resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1, background: '#4361ee', color: '#fff',
                  padding: '13px', fontSize: 15, borderRadius: 10,
                  opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? '⏳ Sending...' : '🚀 Send Emails'}
              </button>
              <button
                type="button"
                onClick={() => { setForm({ subject: '', body: '', recipients: '' }); setStatus(null); }}
                style={{ background: '#f7fafc', color: '#4a5568', border: '1px solid #e2e8f0' }}
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

const labelStyle = {
  display: 'block', fontSize: 13, fontWeight: 600,
  color: '#4a5568', marginBottom: 6
};
