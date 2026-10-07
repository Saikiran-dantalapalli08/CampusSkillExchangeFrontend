import axios from 'axios';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('campusAuth');
    delete axios.defaults.headers.common.Authorization;
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand">Campus Skill Exchange</Link>
        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/explore">Explore Skills</NavLink>
          <NavLink to="/matches">Matches</NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/requests">Requests</NavLink>
              <NavLink to="/sessions">Sessions</NavLink>
              <NavLink to="/my-profile">Profile</NavLink>
              {user.role === 'ROLE_ADMIN' && <NavLink to="/admin">Admin</NavLink>}
              <button className="btn btn-light" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
