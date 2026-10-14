import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function Requests() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);

  const loadRequests = async () => {
    if (!user) return;

    try {
      const [receivedRes, sentRes] = await Promise.all([
        api.get(`/requests/received/${user.id}`),
        api.get(`/requests/sent/${user.id}`)
      ]);

      setReceived(receivedRes.data);
      setSent(sentRes.data);
    } catch (error) {
      setReceived([]);
      setSent([]);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    loadRequests();
  }, [user, navigate]);

  const handleDecision = async (requestId, decision) => {
    try {
      await api.put(`/requests/${requestId}/${decision}`);
      await loadRequests();
    } catch (error) {
      alert('Unable to update request status right now.');
    }
  };

  return (
    <div className="container">
      <h2>Requests</h2>
      <div className="two-panel-layout">
        <div>
          <h3>Received Requests</h3>
          <div className="stack-list">
            {received.length > 0 ? received.map((request) => (
              <div key={request.id} className="card request-card">
                <h4>{request.skill?.name || 'Skill'}</h4>
                <p><strong>Student Name:</strong> {request.sender?.name}</p>
                <p><strong>Message:</strong> {request.message}</p>
                <p><strong>Date:</strong> {new Date(request.createdAt).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {request.status}</p>
                {request.status === 'PENDING' && (
                  <div className="card-actions">
                    <button className="btn btn-primary" onClick={() => handleDecision(request.id, 'accept')}>Accept</button>
                    <button className="btn btn-light" onClick={() => handleDecision(request.id, 'reject')}>Reject</button>
                  </div>
                )}
              </div>
            )) : <p>No received requests.</p>}
          </div>
        </div>

        <div>
          <h3>Sent Requests</h3>
          <div className="stack-list">
            {sent.length > 0 ? sent.map((request) => (
              <div key={request.id} className="card request-card">
                <h4>{request.skill?.name || 'Skill'}</h4>
                <p><strong>Student Name:</strong> {request.receiver?.name}</p>
                <p><strong>Request Date:</strong> {new Date(request.createdAt).toLocaleDateString()}</p>
                <span className="status-pill">{request.status}</span>
              </div>
            )) : <p>No sent requests.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Requests;
