import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!user || user.role !== 'ROLE_ADMIN') {
      navigate('/login');
      return;
    }

    axios.get('http://localhost:8081/api/admin/stats')
      .then((res) => setStats(res.data))
      .catch(() => setStats({}));

    axios.get('http://localhost:8081/api/admin/users')
      .then((res) => setUsers(res.data))
      .catch(() => setUsers([]));
  }, [user, navigate]);

  return (
    <div className="container dashboard-page">
      <h2>Admin Dashboard</h2>
      <div className="stats-grid">
        <div className="card stat-card"><h3>Total Students</h3><p>{stats.totalStudents || 0}</p></div>
        <div className="card stat-card"><h3>Total Skills</h3><p>{stats.totalSkills || 0}</p></div>
        <div className="card stat-card"><h3>Total Learning Requests</h3><p>{stats.totalLearningRequests || 0}</p></div>
        <div className="card stat-card"><h3>Total Sessions</h3><p>{stats.totalSessions || 0}</p></div>
      </div>

      <div className="panel-section">
        <h3>Manage Students</h3>
        <div className="stack-list">
          {users.map((student) => (
            <div key={student.id} className="card user-row">
              <strong>{student.name}</strong>
              <span>{student.department}</span>
              <span>{student.email}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
