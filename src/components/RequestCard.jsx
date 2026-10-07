function RequestCard({ request, type = 'received' }) {
  return (
    <div className="card request-card">
      <h4>{request.skill?.name || 'Skill'}</h4>
      <p><strong>{type === 'received' ? 'From' : 'To'}:</strong> {type === 'received' ? request.sender?.name : request.receiver?.name}</p>
      <p><strong>Message:</strong> {request.message}</p>
      <p><strong>Date:</strong> {new Date(request.createdAt).toLocaleDateString()}</p>
      {type === 'received' ? (
        <div className="card-actions">
          <button className="btn btn-primary">Accept</button>
          <button className="btn btn-light">Reject</button>
        </div>
      ) : (
        <span className="status-pill">{request.status}</span>
      )}
    </div>
  );
}

export default RequestCard;
