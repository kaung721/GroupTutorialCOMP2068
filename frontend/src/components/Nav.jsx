import { auth } from '../api';
import { Link, NavLink, useNavigate } from 'react-router-dom';

function Nav({ user, setUser }) {
  const nav = useNavigate();
  const logout = async () => {
    await auth.logout();
    setUser(null);
    nav('/');
  };
  return (
    <nav className="navbar navbar-expand-lg news-navbar mb-3">
      <div className="container">
        <Link className="navbar-brand" to="/">
          NEWS<span className="accent">WIRE</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink end className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/saved">
                Saved Articles
              </NavLink>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            {user ? (
              <>
                <span className="navbar-text me-3">Signed in as {user.email}</span>
                <button className="btn btn-sm btn-outline-light" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-sm btn-outline-light me-2" to="/login">
                  Login
                </Link>
                <Link className="btn btn-sm btn-light" to="/register">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Nav;