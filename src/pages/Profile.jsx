import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user: loggedInUser } = useAuth();
  const [user, setUser] = useState(null);
  const [selectedSkillId, setSelectedSkillId] = useState('');
  const [message, setMessage] = useState('Hi! I would like to learn this skill from you.');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get(`/users/${id}`)
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, [id]);

  useEffect(() => {
    if (!user) return;

    const teachSkills = user.userSkills?.filter((skill) => skill.type === 'TEACH') || [];
    const preferredSkillName = location.state?.preferredSkillName;
    const preferredSkill = teachSkills.find((skill) => skill.skill.name === preferredSkillName);
    const fallbackSkill = teachSkills[0]?.skill;

    if (fallbackSkill) {
      setSelectedSkillId(String(preferredSkill?.skill?.id || fallbackSkill.id));
    }
  }, [user, location.state]);

  const handleSendRequest = async () => {
    if (!loggedInUser) {
      navigate('/login');
      return;
    }

    if (!selectedSkillId) {
      alert('Please choose a skill to request.');
      return;
    }

    setSubmitting(true);

    try {
      await api.post('/requests', {
        senderId: loggedInUser.id,
        receiverId: Number(id),
        skillId: Number(selectedSkillId),
        message
      });

      navigate('/requests');
    } catch (error) {
      alert('Unable to send learning request right now.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) return <div className="container"><p>Loading profile...</p></div>;

  const teachSkills = user.userSkills?.filter((skill) => skill.type === 'TEACH') || [];

  return (
    <div className="container profile-page">
      <div className="card profile-card">
        <img src={user.profileImage || 'https://ui-avatars.com/api/?name=' + user.name} alt={user.name} className="profile-avatar" />
        <h2>{user.name}</h2>
        <p>{user.department} • {user.year}</p>
        <p>{user.bio}</p>

        <div className="skills-box">
          <h3>Skills They Teach</h3>
          <div className="tag-list">{teachSkills.map((skill) => <span key={skill.id} className="tag">{skill.skill.name}</span>)}</div>
        </div>

        <div className="skills-box">
          <h3>Skills They Want to Learn</h3>
          <div className="tag-list">{user.userSkills?.filter((skill) => skill.type === 'LEARN').map((skill) => <span key={skill.id} className="tag secondary">{skill.skill.name}</span>)}</div>
        </div>

        {teachSkills.length > 0 && (
          <div className="card" style={{ marginTop: '1rem' }}>
            <h3>Send learning request</h3>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              Skill
              <select value={selectedSkillId} onChange={(e) => setSelectedSkillId(e.target.value)} style={{ width: '100%', marginTop: '0.35rem' }}>
                {teachSkills.map((skill) => (
                  <option key={skill.skill.id} value={skill.skill.id}>{skill.skill.name}</option>
                ))}
              </select>
            </label>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              Message
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
                style={{ width: '100%', marginTop: '0.35rem' }}
              />
            </label>
            <div className="card-actions">
              <button className="btn btn-primary" onClick={handleSendRequest} disabled={submitting}>
                {submitting ? 'Sending...' : 'Send Request'}
              </button>
            </div>
          </div>
        )}

        <div className="card-actions" style={{ marginTop: '1rem' }}>
          <button className="btn btn-light" onClick={() => navigate('/matches')}>Back</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
