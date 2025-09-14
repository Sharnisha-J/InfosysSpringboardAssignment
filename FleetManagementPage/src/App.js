// App.js
import React, { useState, useEffect } from 'react';
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
    setIsLoggedIn(true);
  };

  const handleSignup = (e) => {
    e.preventDefault();
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
  const [activeTab, setActiveTab] = useState('dashboard');
  const [vehicles, setVehicles] = useState([]);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [newVehicle, setNewVehicle] = useState({
    name: '',
    type: 'car',
    status: 'idle'
  });

  // Load sample vehicles on first render
  useEffect(() => {
    const sampleVehicles = [
      {
        id: 1,
        name: 'Tesla Model 3',
        type: 'car',
        status: 'in_use',
        battery: 78,
        location: { lat: 40.7128, lng: -74.0060 },
        speed: 45
      },
      {
        id: 2,
        name: 'Nissan Leaf',
        type: 'car',
        status: 'idle',
        battery: 92,
        location: { lat: 40.7282, lng: -73.9942 },
        speed: 0
      },
      {
        id: 3,
        name: 'Ford Transit',
        type: 'van',
        status: 'maintenance',
        battery: 34,
        location: { lat: 40.7580, lng: -73.9855 },
        speed: 0
      },
      {
        id: 4,
        name: 'BMW i3',
        type: 'car',
        status: 'idle',
        battery: 100,
        location: { lat: 40.7505, lng: -73.9934 },
        speed: 0
      }
    ];
    setVehicles(sampleVehicles);
  }, []);

  // Simulate telemetry updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles(prevVehicles => 
        prevVehicles.map(vehicle => {
          if (vehicle.status === 'in_use') {
            // Simulate small changes for vehicles in use
            const batteryChange = Math.random() * 2 - 1; // -1 to +1
            const speedChange = Math.random() * 10 - 5; // -5 to +5
            const latChange = (Math.random() - 0.5) * 0.001;
            const lngChange = (Math.random() - 0.5) * 0.001;
            
            return {
              ...vehicle,
              battery: Math.max(0, Math.min(100, vehicle.battery - batteryChange)),
              speed: Math.max(0, vehicle.speed + speedChange),
              location: {
                lat: vehicle.location.lat + latChange,
                lng: vehicle.location.lng + lngChange
              }
            };
          }
          return vehicle;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleAddVehicle = () => {
    const vehicle = {
      id: vehicles.length > 0 ? Math.max(...vehicles.map(v => v.id)) + 1 : 1,
      ...newVehicle,
      battery: 100,
      location: { lat: 40.7128 + (Math.random() - 0.5) * 0.1, lng: -74.0060 + (Math.random() - 0.5) * 0.1 },
      speed: 0
    };
    setVehicles([...vehicles, vehicle]);
    setNewVehicle({ name: '', type: 'car', status: 'idle' });
    setShowAddVehicle(false);
  };

  const handleUpdateVehicle = () => {
    setVehicles(vehicles.map(vehicle => 
      vehicle.id === editingVehicle.id ? editingVehicle : vehicle
    ));
    setEditingVehicle(null);
  };

  const handleDeleteVehicle = (id) => {
    setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
  };

  const handleInputChange = (e, field) => {
    if (editingVehicle) {
      setEditingVehicle({
        ...editingVehicle,
        [field]: e.target.value
      });
    } else {
      setNewVehicle({
        ...newVehicle,
        [field]: e.target.value
      });
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'idle': return 'Available';
      case 'in_use': return 'In Use';
      case 'maintenance': return 'Needs Service';
      default: return status;
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'idle': return 'status-available';
      case 'in_use': return 'status-in-use';
      case 'maintenance': return 'status-maintenance';
      default: return '';
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <h1>NeuroFleetX</h1>
          <p>AI-Driven Urban Mobility Solutions</p>
          <nav className="nav-tabs">
            <button 
              className={activeTab === 'dashboard' ? 'nav-tab active' : 'nav-tab'} 
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
            <button 
              className={activeTab === 'fleet' ? 'nav-tab active' : 'nav-tab'} 
              onClick={() => setActiveTab('fleet')}
            >
              Fleet Management
            </button>
          </nav>
          <button onClick={onLogout} className="logout-button">Logout</button>
        </div>
      </header>
      
      <main className="home-content">
        {activeTab === 'dashboard' ? (
          <>
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
          </>
        ) : (
          <section className="fleet-section">
            <div className="fleet-header">
              <h2>Fleet Management</h2>
              <button 
                className="add-vehicle-btn"
                onClick={() => setShowAddVehicle(true)}
              >
                + Add Vehicle
              </button>
            </div>

            {showAddVehicle && (
              <div className="modal-overlay">
                <div className="modal">
                  <h3>Add New Vehicle</h3>
                  <div className="form-group">
                    <label>Vehicle Name</label>
                    <input
                      type="text"
                      value={newVehicle.name}
                      onChange={(e) => handleInputChange(e, 'name')}
                      placeholder="Enter vehicle name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Type</label>
                    <select
                      value={newVehicle.type}
                      onChange={(e) => handleInputChange(e, 'type')}
                    >
                      <option value="car">Car</option>
                      <option value="van">Van</option>
                      <option value="truck">Truck</option>
                      <option value="scooter">Scooter</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={newVehicle.status}
                      onChange={(e) => handleInputChange(e, 'status')}
                    >
                      <option value="idle">Available</option>
                      <option value="in_use">In Use</option>
                      <option value="maintenance">Needs Service</option>
                    </select>
                  </div>
                  <div className="modal-actions">
                    <button onClick={() => setShowAddVehicle(false)}>Cancel</button>
                    <button onClick={handleAddVehicle}>Add Vehicle</button>
                  </div>
                </div>
              </div>
            )}

            {editingVehicle && (
              <div className="modal-overlay">
                <div className="modal">
                  <h3>Edit Vehicle</h3>
                  <div className="form-group">
                    <label>Vehicle Name</label>
                    <input
                      type="text"
                      value={editingVehicle.name}
                      onChange={(e) => handleInputChange(e, 'name')}
                    />
                  </div>
                  <div className="form-group">
                    <label>Type</label>
                    <select
                      value={editingVehicle.type}
                      onChange={(e) => handleInputChange(e, 'type')}
                    >
                      <option value="car">Car</option>
                      <option value="van">Van</option>
                      <option value="truck">Truck</option>
                      <option value="scooter">Scooter</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={editingVehicle.status}
                      onChange={(e) => handleInputChange(e, 'status')}
                    >
                      <option value="idle">Available</option>
                      <option value="in_use">In Use</option>
                      <option value="maintenance">Needs Service</option>
                    </select>
                  </div>
                  <div className="modal-actions">
                    <button onClick={() => setEditingVehicle(null)}>Cancel</button>
                    <button onClick={handleUpdateVehicle}>Update Vehicle</button>
                  </div>
                </div>
              </div>
            )}

            <div className="vehicles-grid">
              {vehicles.map(vehicle => (
                <div key={vehicle.id} className="vehicle-card">
                  <div className="vehicle-header">
                    <h3>{vehicle.name}</h3>
                    <span className={`status-chip ${getStatusClass(vehicle.status)}`}>
                      {getStatusText(vehicle.status)}
                    </span>
                  </div>
                  <div className="vehicle-type">{vehicle.type.toUpperCase()}</div>
                  <div className="vehicle-details">
                    <div className="detail-row">
                      <span className="label">Location:</span>
                      <span className="value">
                        {vehicle.location.lat.toFixed(4)}, {vehicle.location.lng.toFixed(4)}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Speed:</span>
                      <span className="value">{vehicle.speed.toFixed(0)} mph</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Battery:</span>
                      <div className="battery-container">
                        <div className="battery-level">
                          <div 
                            className="battery-fill"
                            style={{ width: `${vehicle.battery}%` }}
                          ></div>
                        </div>
                        <span className="battery-percent">{vehicle.battery.toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="vehicle-actions">
                    <button 
                      className="action-btn edit"
                      onClick={() => setEditingVehicle(vehicle)}
                    >
                      Edit
                    </button>
                    <button 
                      className="action-btn delete"
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      
      <footer className="home-footer">
        <p>© 2023 NeuroFleetX. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;