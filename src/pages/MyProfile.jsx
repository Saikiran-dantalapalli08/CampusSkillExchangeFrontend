import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function MyProfile() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    department: '',
    year: '',
    bio: '',
    profileImage: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    setForm({
      name: user.name || '',
      department: user.department || '',
      year: user.year || '',
      bio: user.bio || '',
      profileImage: user.profileImage || ''
    });
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8081/api/users/${user.id}`, form);
      setUser(response.data);
      alert('Profile updated successfully');
    } catch (error) {
      alert('Failed to update profile');
    }
  };

  return (
    <div className="container form-page">
      <div className="card form-card large-card">
        <h2>My Profile</h2>
        <form onSubmit={handleSubmit} className="form-grid two-col">
          <label>
            Name
            <input type="text" name="name" value={form.name} onChange={handleChange} />
          </label>
          <label>
            Department
            <input type="text" name="department" value={form.department} onChange={handleChange} />
          </label>
          <label>
            Year
            <input type="text" name="year" value={form.year} onChange={handleChange} />
          </label>
          <label>
            Profile Image URL
            <input type="text" name="profileImage" value={form.profileImage} onChange={handleChange} />
          </label>
          <label className="full-span">
            Bio
            <textarea name="bio" value={form.bio} onChange={handleChange} rows="4" />
          </label>
          <button type="submit" className="btn btn-primary full-span">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default MyProfile;
