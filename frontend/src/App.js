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
    auth.me().then( r => setUser(r.user)).catch( () => setUser(null)).finally( () => setLoading(false));
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <Nav user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/saved" element={<SavedPage user={user} />} />
        <Route path="/login" element={<LoginPage onLogin={setUser} />} />
        <Route path="/register" element={<RegisterPage onRegister={setUser} />} />
      </Routes>
    </div>
  );
}

export default App;
