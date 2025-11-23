import { auth } from '../api';
import { Link, useNavigate } from 'react-router-dom';

function Nav({ user, setUser }) {
  const nav = useNavigate();
  const logout = async () => {
    await auth.logout();
    setUser(null);
    nav('/');
  };
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 rounded">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">NewsApp</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/saved">Saved Articles</Link>
                        </li>
                    </ul>
                    <div className="d-flex">
                        {user ? (
                            <>
                                <span className="navbar-text me-3">Hello, {user.email}</span>
                                <button className="btn btn-outline-secondary" onClick={logout}>Logout</button>
                                </>
                        ) : (
                            <>
                            <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
                            <Link className="btn btn-primary" to="/register">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );                  
}
export default Nav;