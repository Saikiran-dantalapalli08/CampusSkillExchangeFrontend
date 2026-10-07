function SkillCard({ skill, onClick }) {
  return (
    <div className="card skill-card">
      <div className="skill-tag">{skill.category}</div>
      <h4>{skill.name}</h4>
      <p>{skill.level}</p>
      {onClick && <button className="btn btn-primary" onClick={onClick}>View</button>}
    </div>
  );
}

export default SkillCard;
