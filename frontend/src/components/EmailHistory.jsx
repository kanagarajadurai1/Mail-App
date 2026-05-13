import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function EmailHistory() {
  const { token } = useAuth();
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    axios.get('https://mail-app-mu-taupe.vercel.app/api/emails/history', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => setEmails(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: 60, color: '#718096' }}>Loading history...</div>
  );

  return (
    <div style={{ maxWidth: 780, margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>📋 Email History</h1>
      <p style={{ color: '#718096', fontSize: 14, marginBottom: 24 }}>
        {emails.length} email{emails.length !== 1 ? 's' : ''} sent
      </p>

      {emails.length === 0 ? (
        <div style={{
          background: '#fff', borderRadius: 12, padding: 48,
          textAlign: 'center', color: '#a0aec0'
        }}>
          No emails sent yet.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {emails.map(email => (
            <div
              key={email._id}
              style={{
                background: '#fff', borderRadius: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                border: '1px solid #e2e8f0', overflow: 'hidden'
              }}
            >
              <div
                style={{
                  padding: '16px 20px', display: 'flex',
                  alignItems: 'center', gap: 12, cursor: 'pointer'
                }}
                onClick={() => setExpanded(expanded === email._id ? null : email._id)}
              >
                {/* Status badge */}
                <span style={{
                  padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                  background: email.status === 'sent' ? '#f0fff4' : '#fff5f5',
                  color: email.status === 'sent' ? '#276749' : '#c53030',
                  border: `1px solid ${email.status === 'sent' ? '#68d391' : '#fc8181'}`,
                  flexShrink: 0
                }}>
                  {email.status === 'sent' ? '✅ Sent' : '❌ Failed'}
                </span>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 600, fontSize: 14, color: '#2d3748', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {email.subject}
                  </p>
                  <p style={{ fontSize: 12, color: '#a0aec0', marginTop: 2 }}>
                    {email.recipients.length} recipient{email.recipients.length !== 1 ? 's' : ''} · {new Date(email.sentAt).toLocaleString()}
                  </p>
                </div>

                <span style={{ color: '#a0aec0', fontSize: 18, flexShrink: 0 }}>
                  {expanded === email._id ? '▲' : '▼'}
                </span>
              </div>

              {expanded === email._id && (
                <div style={{ padding: '0 20px 20px', borderTop: '1px solid #e2e8f0' }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#4a5568', marginTop: 14, marginBottom: 6 }}>
                    Recipients:
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {email.recipients.map(r => (
                      <span key={r} style={{
                        background: '#ebf0ff', color: '#4361ee',
                        fontSize: 12, padding: '3px 10px', borderRadius: 20
                      }}>{r}</span>
                    ))}
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#4a5568', marginTop: 14, marginBottom: 6 }}>
                    Body:
                  </p>
                  <div style={{
                    background: '#f7fafc', border: '1px solid #e2e8f0',
                    borderRadius: 8, padding: '12px 14px', fontSize: 13,
                    color: '#4a5568', lineHeight: 1.6, whiteSpace: 'pre-wrap'
                  }}>
                    {email.body}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
