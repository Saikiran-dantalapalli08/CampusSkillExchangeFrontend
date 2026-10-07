function MatchCard({ match, onView, onRequest }) {
  const user = match.user || {};
  return (
    <div className="card match-card">
      <div className="student-header">
        <img src={user.profileImage || 'https://ui-avatars.com/api/?name=' + user.name} alt={user.name} className="avatar" />
        <div>
          <h4>{user.name}</h4>
          <p>{user.department} • {user.year}</p>
        </div>
      </div>
      <div className="match-score">{match.matchPercentage}% Match</div>
      <p><strong>Matching skills:</strong> {match.matchingSkills?.join(', ') || 'N/A'}</p>
      <p><strong>Rating:</strong> {match.rating ? `${match.rating.toFixed(1)} / 5` : 'No ratings yet'}</p>
      <div className="card-actions">
        <button className="btn btn-light" onClick={onView}>View Profile</button>
        <button className="btn btn-primary" onClick={onRequest}>Send Learning Request</button>
      </div>
    </div>
  );
}

export default MatchCard;
