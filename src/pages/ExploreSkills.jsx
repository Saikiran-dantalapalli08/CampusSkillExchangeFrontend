import { useEffect, useState } from 'react';
import axios from 'axios';

function ExploreSkills() {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8081/api/skills')
      .then((res) => setSkills(res.data))
      .catch(() => setSkills([]));
  }, []);

  const filteredSkills = skills.filter((skill) => skill.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container">
      <h2>Explore Skills</h2>
      <div className="search-row">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search skill, e.g. Java" />
      </div>
      <div className="cards-grid two-col">
        {filteredSkills.length > 0 ? filteredSkills.map((skill) => (
          <div key={skill.id} className="card skill-card">
            <div className="skill-tag">{skill.category}</div>
            <h3>{skill.name}</h3>
            <p>{skill.level}</p>
          </div>
        )) : <p>No skills found.</p>}
      </div>
    </div>
  );
}

export default ExploreSkills;
