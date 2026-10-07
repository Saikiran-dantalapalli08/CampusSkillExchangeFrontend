import { Link } from 'react-router-dom';

const steps = [
  'Create Your Profile',
  'Add Skills You Teach & Want to Learn',
  'Find Your Match',
  'Schedule a Learning Session',
  'Rate and Review'
];

function Home() {
  return (
    <div className="container home-page">
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">Campus collaboration</span>
          <h1>Learn. Teach. Connect.</h1>
          <p>
            Exchange skills with students across your campus and learn from people who already know what you want to learn.
          </p>
          <div className="hero-actions">
            <Link to="/explore" className="btn btn-primary">Find a Skill</Link>
            <Link to="/register" className="btn btn-secondary">Start Teaching</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="flow-box">
            <span>Student</span>
            <span className="arrow">→</span>
            <span>Skill Match</span>
            <span className="arrow">→</span>
            <span>Learning Session</span>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2>How It Works</h2>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={step} className="card step-card">
              <span className="step-number">Step {index + 1}</span>
              <h3>{step}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
