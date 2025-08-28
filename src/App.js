// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, you would validate credentials against a backend
    setIsLoggedIn(true);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to a backend
    setIsLoggedIn(true);
  };

  const toggleForm = () => {
    setIsLoginPage(!isLoginPage);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFormData({
      name: '',
      email: '',
      password: ''
    });
  };

  if (isLoggedIn) {
    return <HomePage onLogout={handleLogout} />;
  }

  return (
    <div className="app">
      <div className="auth-container">
        <div className="auth-header">
          <h1>NeuroFleetX</h1>
          <p>AI-Driven Urban Mobility</p>
        </div>
        
        {isLoginPage ? (
          <LoginForm 
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleLogin}
            onToggleForm={toggleForm}
          />
        ) : (
          <SignupForm 
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleSignup}
            onToggleForm={toggleForm}
          />
        )}
      </div>
    </div>
  );
}

function LoginForm({ formData, onChange, onSubmit, onToggleForm }) {
  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <h2>Login to Your Account</h2>
      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={onChange}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={onChange}
          required
        />
      </div>
      <button type="submit" className="auth-button">Login</button>
      <p className="form-toggle">
        Don't have an account? <span onClick={onToggleForm}>Sign up</span>
      </p>
    </form>
  );
}

function SignupForm({ formData, onChange, onSubmit, onToggleForm }) {
  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <h2>Create an Account</h2>
      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={onChange}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={onChange}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={onChange}
          required
        />
      </div>
      <button type="submit" className="auth-button">Sign Up</button>
      <p className="form-toggle">
        Already have an account? <span onClick={onToggleForm}>Login</span>
      </p>
    </form>
  );
}

function HomePage({ onLogout }) {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <h1>NeuroFleetX</h1>
          <p>AI-Driven Urban Mobility Solutions</p>
          <button onClick={onLogout} className="logout-button">Logout</button>
        </div>
      </header>
      
      <main className="home-content">
        <section className="hero-section">
          <div className="hero-content">
            <h2>Revolutionizing Urban Transportation</h2>
            <p>NeuroFleetX leverages cutting-edge artificial intelligence to optimize urban mobility, reduce congestion, and create smarter, more efficient cities.</p>
          </div>
        </section>
        
        <section className="features-section">
          <h2>How NeuroFleetX Transforms Urban Mobility</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>AI-Powered Routing</h3>
              <p>Our advanced algorithms analyze real-time traffic data, weather conditions, and historical patterns to create the most efficient routes for vehicles.</p>
            </div>
            <div className="feature-card">
              <h3>Predictive Demand Analysis</h3>
              <p>NeuroFleetX predicts transportation demand patterns, allowing for proactive fleet management and reduced wait times.</p>
            </div>
            <div className="feature-card">
              <h3>Autonomous Fleet Coordination</h3>
              <p>Seamlessly coordinate autonomous vehicles to work together, optimizing traffic flow and reducing congestion.</p>
            </div>
            <div className="feature-card">
              <h3>Emission Reduction</h3>
              <p>By optimizing routes and reducing idle time, our system significantly decreases carbon emissions and environmental impact.</p>
            </div>
            <div className="feature-card">
              <h3>Real-time Adaptability</h3>
              <p>Our system continuously learns and adapts to changing conditions, ensuring optimal performance at all times.</p>
            </div>
            <div className="feature-card">
              <h3>Multi-Modal Integration</h3>
              <p>NeuroFleetX integrates various transportation modes into a seamless mobility network for effortless urban travel.</p>
            </div>
          </div>
        </section>
        
        <section className="benefits-section">
          <h2>Benefits for Cities and Citizens</h2>
          <div className="benefits-list">
            <div className="benefit-item">
              <h3>For Municipalities</h3>
              <ul>
                <li>Reduced traffic congestion by up to 30%</li>
                <li>Lower infrastructure costs through optimized utilization</li>
                <li>Data-driven urban planning insights</li>
                <li>Improved public satisfaction with transportation services</li>
              </ul>
            </div>
            <div className="benefit-item">
              <h3>For Citizens</h3>
              <ul>
                <li>Shorter commute times and more reliable transportation</li>
                <li>Reduced transportation costs through efficient routing</li>
                <li>Improved air quality and quieter urban environments</li>
                <li>Accessible mobility options for all residents</li>
              </ul>
            </div>
          </div>
        </section>
        
        <section className="technology-section">
          <h2>Our Advanced Technology Stack</h2>
          <p>NeuroFleetX utilizes state-of-the-art machine learning models, including deep neural networks, reinforcement learning, and computer vision technologies. Our system processes petabytes of urban mobility data to continuously improve its predictions and recommendations.</p>
        </section>
      </main>
      
      <footer className="home-footer">
        <p>© 2023 NeuroFleetX. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;