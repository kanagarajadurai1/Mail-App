import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function EmailHistory() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(
          'https://mail-app-sable.vercel.app/api/emails/history',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEmails(data);
      } catch {
        console.error('Failed to fetch history');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [token]);

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fb', padding: '2rem 1rem', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(135deg, #6c63ff, #9b8fff)', borderRadius: '16px', padding: '2rem', color: '#fff', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '600' }}>📋 Email History</h2>
          <p style={{ margin: '4px 0 0', opacity: 0.8, fontSize: '14px' }}>All previously sent emails</p>
        </div>

        {loading && (
          <p style={{ textAlign: 'center', color: '#888', fontSize: '14px' }}>Loading...</p>
        )}

        {!loading && emails.length === 0 && (
          <div style={{ background: '#fff', borderRadius: '12px', padding: '3rem', textAlign: 'center', color: '#aaa' }}>
            <p style={{ fontSize: '48px', margin: '0 0 1rem' }}>📭</p>
            <p style={{ fontSize: '16px' }}>No emails sent yet</p>
          </div>
        )}

        {emails.map(email => (
          <div key={email._id} style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#222' }}>{email.subject}</h3>
              <span style={{
                padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: '600',
                background: email.status === 'sent' ? '#e8f5e9' : '#ffebee',
                color: email.status === 'sent' ? '#2e7d32' : '#c62828'
              }}>
                {email.status === 'sent' ? '✅ Sent' : '❌ Failed'}
              </span>
            </div>
            <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#666' }}>
              <strong>To:</strong> {email.recipients.join(', ')}
            </p>
            <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#888', borderTop: '1px solid #f0f0f0', paddingTop: '8px' }}>
              {email.body?.substring(0, 120)}{email.body?.length > 120 ? '...' : ''}
            </p>
            <p style={{ margin: 0, fontSize: '12px', color: '#bbb' }}>
              {new Date(email.sentAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}