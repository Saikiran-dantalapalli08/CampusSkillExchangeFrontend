import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function Sessions() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    api.get(`/sessions/${user.id}`)
      .then((res) => setSessions(res.data))
      .catch(() => setSessions([]));
  }, [user, navigate]);

  return (
    <div className="container">
      <h2>Sessions</h2>
      <div className="stack-list">
        {sessions.length > 0 ? sessions.map((session) => (
          <div key={session.id} className="card session-card">
            <h3>{session.skill?.name || 'Learning Session'}</h3>
            <p><strong>Teacher:</strong> {session.teacher?.name}</p>
            <p><strong>Learner:</strong> {session.learner?.name}</p>
            <p><strong>Date:</strong> {session.date}</p>
            <p><strong>Time:</strong> {session.time}</p>
            <p><strong>Duration:</strong> {session.duration}</p>
            <a href={session.meetingLink} target="_blank" rel="noreferrer">Join Session</a>
          </div>
        )) : <p>No sessions scheduled yet.</p>}
      </div>
    </div>
  );
}

export default Sessions;
