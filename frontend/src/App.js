import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import SavedPage from './pages/SavedPage';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';
import { auth } from './api';
import Home from './pages/Home';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth
      .me()
      .then((r) => setUser(r.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Nav user={user} setUser={setUser} />
      <main className="app-main">
        <div className="container py-3">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/saved" element={<SavedPage user={user} />} />
            <Route path="/login" element={<LoginPage onLogin={setUser} />} />
            <Route path="/register" element={<RegisterPage onRegister={setUser} />} />
          </Routes>
        </div>
      </main>
      <footer className="app-footer text-center">
        <div className="container">
          <span>© {new Date().getFullYear()} NewsApp. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
