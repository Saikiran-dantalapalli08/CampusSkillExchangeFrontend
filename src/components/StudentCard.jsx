function StudentCard({ student, onView, onRequest }) {
  return (
    <div className="card student-card">
      <div className="student-header">
        <img src={student.profileImage || 'https://ui-avatars.com/api/?name=' + student.name} alt={student.name} className="avatar" />
        <div>
          <h4>{student.name}</h4>
          <p>{student.department}</p>
        </div>
      </div>
      <p className="muted">{student.bio}</p>
      <div className="card-actions">
        <button className="btn btn-light" onClick={onView}>View Profile</button>
        <button className="btn btn-primary" onClick={onRequest}>Send Request</button>
      </div>
    </div>
  );
}

export default StudentCard;
