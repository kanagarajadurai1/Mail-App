import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Navbar from './components/Navbar';
import SendMail from './components/SendMail';
import EmailHistory from './components/EmailHistory';
import './index.css';

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

function Layout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRoute><SendMail /></PrivateRoute>} />
        <Route path="/history" element={<PrivateRoute><EmailHistory /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Layout />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}