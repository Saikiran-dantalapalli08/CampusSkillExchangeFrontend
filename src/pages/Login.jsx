import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8081/api/auth/login', form);
      const loggedUser = response.data.user;
      const authData = {
        email: form.email,
        password: form.password
      };

      localStorage.setItem('campusAuth', JSON.stringify(authData));
      axios.defaults.headers.common.Authorization = 'Basic ' + window.btoa(`${authData.email}:${authData.password}`);

      setUser(loggedUser);
      navigate(loggedUser.role === 'ROLE_ADMIN' ? '/admin' : '/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container form-page">
      <div className="card form-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Password
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </label>
          {error && <p className="error-text">{error}</p>}
          <button className="btn btn-primary" type="submit">Login</button>
        </form>
        <p className="alt-link">Don’t have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

export default Login;
