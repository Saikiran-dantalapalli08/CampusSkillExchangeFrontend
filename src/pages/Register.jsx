import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const skillOptions = [
  'Java', 'C++', 'Python', 'React', 'JavaScript', 'Machine Learning', 'Data Science', 'SQL',
  'Graphic Design', 'UI/UX Design', 'Public Speaking', 'Digital Marketing', 'Video Editing', 'Communication'
];

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    year: '',
    bio: '',
    teachSkillIds: [],
    learnSkillIds: []
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setForm((prev) => {
      const list = new Set(prev[field]);
      if (checked) list.add(Number(value));
      else list.delete(Number(value));
      return { ...prev, [field]: Array.from(list) };
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirmPassword || !form.department || !form.year) {
      setError('Please fill all required fields');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const payload = {
        ...form,
        role: 'ROLE_STUDENT',
        teachSkillIds: form.teachSkillIds,
        learnSkillIds: form.learnSkillIds
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        payload
      );
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message
        || 'Unable to reach the server. Check that the backend is running and the API URL is configured.');
    }
  };

  return (
    <div className="container form-page">
      <div className="card form-card large-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="form-grid two-col">
          <label>
            Full Name
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Password
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </label>
          <label>
            Confirm Password
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
          </label>
          <label>
            Department
            <input type="text" name="department" value={form.department} onChange={handleChange} required />
          </label>
          <label>
            Year
            <input type="text" name="year" value={form.year} onChange={handleChange} required />
          </label>
          <label className="full-span">
            Short Bio
            <textarea name="bio" value={form.bio} onChange={handleChange} rows="3" />
          </label>

          <div className="full-span checkbox-block">
            <h3>Skills I Can Teach</h3>
            <div className="checkbox-grid">
              {skillOptions.map((skill, index) => (
                <label key={skill}>
                  <input type="checkbox" value={index + 1} onChange={(e) => handleCheckboxChange(e, 'teachSkillIds')} /> {skill}
                </label>
              ))}
            </div>
          </div>

          <div className="full-span checkbox-block">
            <h3>Skills I Want to Learn</h3>
            <div className="checkbox-grid">
              {skillOptions.map((skill, index) => (
                <label key={`${skill}-learn`}>
                  <input type="checkbox" value={index + 1} onChange={(e) => handleCheckboxChange(e, 'learnSkillIds')} /> {skill}
                </label>
              ))}
            </div>
          </div>

          {error && <p className="error-text full-span">{error}</p>}
          <button className="btn btn-primary full-span" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
