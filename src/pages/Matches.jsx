import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function Matches() {
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
    <div className="container">
      <h2>Recommended Matches</h2>
      <div className="cards-grid">
        {matches.length > 0 ? matches.map((match) => (
          <div key={match.user.id} className="card match-card">
            <div className="student-header">
              <img src={match.user.profileImage || 'https://ui-avatars.com/api/?name=' + match.user.name} alt={match.user.name} className="avatar" />
              <div>
                <h4>{match.user.name}</h4>
                <p>{match.user.department} • {match.user.year}</p>
              </div>
            </div>
            <div className="match-score">{match.matchPercentage}% Match</div>
            <p><strong>Skills they teach:</strong> {match.user.userSkills?.filter((s) => s.type === 'TEACH').map((s) => s.skill.name).join(', ')}</p>
            <p><strong>Matching skills:</strong> {match.matchingSkills.join(', ')}</p>
            <p><strong>Rating:</strong> {match.rating ? `${match.rating.toFixed(1)} / 5` : 'No ratings yet'}</p>
            <div className="card-actions">
              <button className="btn btn-light" onClick={() => navigate(`/profile/${match.user.id}`)}>View Profile</button>
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/profile/${match.user.id}`, {
                  state: {
                    preferredSkillName: match.matchingSkills?.[0] || match.user.userSkills?.find((s) => s.type === 'TEACH')?.skill?.name
                  }
                })}
              >
                Send Learning Request
              </button>
            </div>
          </div>
        )) : <p>No recommended matches found.</p>}
      </div>
    </div>
  );
}

export default Matches;
