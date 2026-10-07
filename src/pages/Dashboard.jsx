import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    axios.get(`http://localhost:8081/api/matches/${user.id}`)
      .then((res) => setMatches(res.data))
      .catch(() => setMatches([]));
  }, [user, navigate]);

  return (
    <div className="container dashboard-page">
      <h2>Welcome, {user?.name}</h2>
      <div className="stats-grid">
        <div className="card stat-card"><h3>Skills I Teach</h3><p>{user?.userSkills?.filter((skill) => skill.type === 'TEACH').length || 0}</p></div>
        <div className="card stat-card"><h3>Skills I Want to Learn</h3><p>{user?.userSkills?.filter((skill) => skill.type === 'LEARN').length || 0}</p></div>
        <div className="card stat-card"><h3>Learning Requests</h3><p>0</p></div>
        <div className="card stat-card"><h3>Upcoming Sessions</h3><p>0</p></div>
      </div>

      <section className="panel-section">
        <h3>Recommended Matches</h3>
        <div className="cards-grid">
          {matches.length > 0 ? matches.slice(0, 3).map((match) => (
            <div key={match.user.id} className="card match-preview">
              <div className="student-header">
                <img src={match.user.profileImage || 'https://ui-avatars.com/api/?name=' + match.user.name} alt={match.user.name} className="avatar" />
                <div>
                  <h4>{match.user.name}</h4>
                  <p>{match.user.department}</p>
                </div>
              </div>
              <p className="match-score">{match.matchPercentage}% Match</p>
              <small>{match.matchingSkills.join(', ')}</small>
              <button className="btn btn-primary" onClick={() => navigate(`/profile/${match.user.id}`)}>View Profile</button>
            </div>
          )) : <p>No matches yet. Add your learn skills to see recommendations.</p>}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
