// App.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom vehicle icons
const vehicleIcons = {
  car: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2251/2251874.png',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  }),
  van: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3576/3576876.png',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  }),
  truck: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3576/3576900.png',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  }),
  scooter: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3576/3576861.png',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  }),
};

// User roles
const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  OPERATOR: 'operator',
  VIEWER: 'viewer'
};

// Initial users database
const initialUsers = [
  { id: 1, name: 'Admin User', email: 'admin@neurofleetx.com', password: 'admin123', role: USER_ROLES.ADMIN },
  { id: 2, name: 'Fleet Manager', email: 'manager@neurofleetx.com', password: 'manager123', role: USER_ROLES.MANAGER },
  { id: 3, name: 'Operator', email: 'operator@neurofleetx.com', password: 'operator123', role: USER_ROLES.OPERATOR },
  { id: 4, name: 'Viewer', email: 'viewer@neurofleetx.com', password: 'viewer123', role: USER_ROLES.VIEWER },
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
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
    const user = initialUsers.find(u => u.email === formData.email && u.password === formData.password);
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
    } else {
      alert('Invalid email or password');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // In a real app, this would create a new user with VIEWER role by default
    const newUser = {
      id: initialUsers.length + 1,
      ...formData,
      role: USER_ROLES.VIEWER
    };
    initialUsers.push(newUser);
    setCurrentUser(newUser);
    setIsLoggedIn(true);
  };

  const toggleForm = () => {
    setIsLoginPage(!isLoginPage);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setFormData({
      name: '',
      email: '',
      password: ''
    });
  };

  if (isLoggedIn) {
    return <HomePage onLogout={handleLogout} currentUser={currentUser} />;
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

function HomePage({ onLogout, currentUser }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [vehicles, setVehicles] = useState([]);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [optimizationResult, setOptimizationResult] = useState(null);
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [routeRequest, setRouteRequest] = useState({
    origin: '',
    destination: '',
    vehicleType: 'car',
    priority: 'fastest'
  });
  const [newVehicle, setNewVehicle] = useState({
    name: '',
    type: 'car',
    status: 'idle'
  });

  // Center coordinates for New Delhi, India
  const indiaCenter = [28.6139, 77.2090];

  // Load sample vehicles on first render with Indian locations
  useEffect(() => {
    const sampleVehicles = [
      {
        id: 1,
        name: 'Tata Nexon EV',
        type: 'car',
        status: 'in_use',
        battery: 78,
        location: { lat: 28.6139, lng: 77.2090 }, // New Delhi
        speed: 45,
        maintenance: {
          engine: 85,
          tires: 70,
          brakes: 90,
          batteryHealth: 78,
          mileage: 12500
        }
      },
      {
        id: 2,
        name: 'Mahindra eVerito',
        type: 'car',
        status: 'idle',
        battery: 92,
        location: { lat: 28.4595, lng: 77.0266 }, // Gurugram
        speed: 0,
        maintenance: {
          engine: 92,
          tires: 85,
          brakes: 88,
          batteryHealth: 92,
          mileage: 8700
        }
      },
      {
        id: 3,
        name: 'Ashok Leyland Dost',
        type: 'truck',
        status: 'maintenance',
        battery: 34,
        location: { lat: 12.9716, lng: 77.5946 }, // Bangalore
        speed: 0,
        maintenance: {
          engine: 45,
          tires: 30,
          brakes: 60,
          batteryHealth: 34,
          mileage: 32500
        }
      },
      {
        id: 4,
        name: 'Ola S1 Pro',
        type: 'scooter',
        status: 'idle',
        battery: 100,
        location: { lat: 19.0760, lng: 72.8777 }, // Mumbai
        speed: 0,
        maintenance: {
          engine: 95,
          tires: 90,
          brakes: 92,
          batteryHealth: 100,
          mileage: 3200
        }
      },
      {
        id: 5,
        name: 'Tata Tigor EV',
        type: 'car',
        status: 'in_use',
        battery: 65,
        location: { lat: 13.0827, lng: 80.2707 }, // Chennai
        speed: 38,
        maintenance: {
          engine: 80,
          tires: 75,
          brakes: 82,
          batteryHealth: 65,
          mileage: 15200
        }
      },
      {
        id: 6,
        name: 'Mahindra eSupro',
        type: 'van',
        status: 'idle',
        battery: 88,
        location: { lat: 22.5726, lng: 88.3639 }, // Kolkata
        speed: 0,
        maintenance: {
          engine: 88,
          tires: 80,
          brakes: 85,
          batteryHealth: 88,
          mileage: 18500
        }
      }
    ];
    setVehicles(sampleVehicles);
    
    // Generate maintenance data
    const maintenanceStatus = [
      { status: 'Healthy', count: 4, color: '#0bb56d' },
      { status: 'Due', count: 1, color: '#e67e22' },
      { status: 'Critical', count: 1, color: '#e74c3c' }
    ];
    setMaintenanceData(maintenanceStatus);
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
              },
              maintenance: {
                ...vehicle.maintenance,
                batteryHealth: Math.max(0, Math.min(100, vehicle.maintenance.batteryHealth - batteryChange/10)),
                mileage: vehicle.maintenance.mileage + (vehicle.speed / 60) // Simulate mileage increase
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
    // Generate a random location within India
    const randomInRange = (min, max) => Math.random() * (max - min) + min;
    const indiaBounds = {
      lat: { min: 8.0, max: 37.0 },   // Approximate latitude range of India
      lng: { min: 68.0, max: 97.0 }   // Approximate longitude range of India
    };
    
    const vehicle = {
      id: vehicles.length > 0 ? Math.max(...vehicles.map(v => v.id)) + 1 : 1,
      ...newVehicle,
      battery: 100,
      location: { 
        lat: randomInRange(indiaBounds.lat.min, indiaBounds.lat.max),
        lng: randomInRange(indiaBounds.lng.min, indiaBounds.lng.max)
      },
      speed: 0,
      maintenance: {
        engine: 100,
        tires: 100,
        brakes: 100,
        batteryHealth: 100,
        mileage: 0
      }
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

  const handleRouteInputChange = (e) => {
    const { name, value } = e.target;
    setRouteRequest({
      ...routeRequest,
      [name]: value
    });
  };

  const optimizeRoute = () => {
    // Simulate AI route optimization
    const distance = Math.floor(Math.random() * 100) + 20; // 20-120 km
    const time = Math.floor(distance / (Math.random() * 30 + 30) * 60); // minutes
    const savings = Math.floor(Math.random() * 15) + 5; // 5-20% savings
    
    setOptimizationResult({
      distance: `${distance} km`,
      estimatedTime: `${time} minutes`,
      fuelSavings: `${savings}%`,
      recommendedVehicle: routeRequest.vehicleType,
      route: [
        { lat: 28.6139, lng: 77.2090 }, // Delhi
        { lat: 28.4595, lng: 77.0266 }, // Gurgaon
        { lat: 28.4089, lng: 77.3178 }  // Faridabad
      ]
    });
  };

  const exportData = (format) => {
    // Simulate data export
    alert(`Exporting data in ${format.toUpperCase()} format`);
    // In a real application, this would generate and download a file
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

  const getMaintenanceStatus = (vehicle) => {
    const avgHealth = (
      vehicle.maintenance.engine + 
      vehicle.maintenance.tires + 
      vehicle.maintenance.brakes + 
      vehicle.maintenance.batteryHealth
    ) / 4;
    
    if (avgHealth >= 80) return 'Healthy';
    if (avgHealth >= 50) return 'Due';
    return 'Critical';
  };

  const canEdit = () => {
    return currentUser.role === USER_ROLES.ADMIN || currentUser.role === USER_ROLES.MANAGER;
  };

  const canViewSensitive = () => {
    return currentUser.role === USER_ROLES.ADMIN || currentUser.role === USER_ROLES.MANAGER || currentUser.role === USER_ROLES.OPERATOR;
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <div>
            <h1>NeuroFleetX India</h1>
            <p>AI-Driven Urban Mobility Solutions | Logged in as: {currentUser.name} ({currentUser.role})</p>
          </div>
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
            <button 
              className={activeTab === 'optimization' ? 'nav-tab active' : 'nav-tab'} 
              onClick={() => setActiveTab('optimization')}
            >
              Route Optimization
            </button>
            <button 
              className={activeTab === 'maintenance' ? 'nav-tab active' : 'nav-tab'} 
              onClick={() => setActiveTab('maintenance')}
            >
              Maintenance
            </button>
            <button 
              className={activeTab === 'map' ? 'nav-tab active' : 'nav-tab'} 
              onClick={() => setActiveTab('map')}
            >
              Live Map
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
                <h2>Revolutionizing Urban Transportation in India</h2>
                <p>NeuroFleetX leverages cutting-edge artificial intelligence to optimize urban mobility, reduce congestion, and create smarter, more efficient cities across India.</p>
              </div>
            </section>
            
            <section className="features-section">
              <h2>How NeuroFleetX Transforms Urban Mobility in India</h2>
              <div className="features-grid">
                <div className="feature-card">
                  <h3>AI-Powered Routing</h3>
                  <p>Our advanced algorithms analyze real-time traffic data, weather conditions, and historical patterns to create the most efficient routes for vehicles navigating Indian cities.</p>
                </div>
                <div className="feature-card">
                  <h3>Predictive Demand Analysis</h3>
                  <p>NeuroFleetX predicts transportation demand patterns across Indian metropolitan areas, allowing for proactive fleet management and reduced wait times.</p>
                </div>
                <div className="feature-card">
                  <h3>Autonomous Fleet Coordination</h3>
                  <p>Seamlessly coordinate autonomous vehicles to work together, optimizing traffic flow and reducing congestion in India's busiest cities.</p>
                </div>
                <div className="feature-card">
                  <h3>Emission Reduction</h3>
                  <p>By optimizing routes and reducing idle time, our system significantly decreases carbon emissions and environmental impact in Indian urban centers.</p>
                </div>
                <div className="feature-card">
                  <h3>Real-time Adaptability</h3>
                  <p>Our system continuously learns and adapts to changing Indian traffic conditions, ensuring optimal performance at all times.</p>
                </div>
                <div className="feature-card">
                  <h3>Multi-Modal Integration</h3>
                  <p>NeuroFleetX integrates various transportation modes into a seamless mobility network for effortless urban travel across India.</p>
                </div>
              </div>
            </section>
          </>
        ) : activeTab === 'fleet' ? (
          <section className="fleet-section">
            <div className="fleet-header">
              <h2>Fleet Management</h2>
              {canEdit() && (
                <button 
                  className="add-vehicle-btn"
                  onClick={() => setShowAddVehicle(true)}
                >
                  + Add Vehicle
                </button>
              )}
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
                      <option value='in_use'>In Use</option>
                      <option value='maintenance'>Needs Service</option>
                    </select>
                  </div>
                  <div className="modal-actions">
                    <button onClick={() => setEditingVehicle(null)}>Cancel</button>
                    <button onClick={handleUpdateVehicle}>Update Vehicle</button>
                  </div>
                </div>
              </div>
            )}

            <div className="export-actions">
              <button onClick={() => exportData('csv')} className="export-btn">Export CSV</button>
              <button onClick={() => exportData('pdf')} className="export-btn">Export PDF</button>
            </div>

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
                        {getIndianCityName(vehicle.location.lat, vehicle.location.lng)}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Speed:</span>
                      <span className="value">{vehicle.speed.toFixed(0)} km/h</span>
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
                    {canViewSensitive() && (
                      <>
                        <div className="detail-row">
                          <span className="label">Maintenance:</span>
                          <span className={`value ${getMaintenanceStatus(vehicle).toLowerCase()}`}>
                            {getMaintenanceStatus(vehicle)}
                          </span>
                        </div>
                        <div className="detail-row">
                          <span className="label">Mileage:</span>
                          <span className="value">{vehicle.maintenance.mileage.toFixed(0)} km</span>
                        </div>
                      </>
                    )}
                  </div>
                  {canEdit() && (
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
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : activeTab === 'optimization' ? (
          <section className="optimization-section">
            <h2>AI Route & Load Optimization</h2>
            
            <div className="optimization-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Origin</label>
                  <input
                    type="text"
                    name="origin"
                    value={routeRequest.origin}
                    onChange={handleRouteInputChange}
                    placeholder="Starting location"
                  />
                </div>
                <div className="form-group">
                  <label>Destination</label>
                  <input
                    type="text"
                    name="destination"
                    value={routeRequest.destination}
                    onChange={handleRouteInputChange}
                    placeholder="Destination"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Vehicle Type</label>
                  <select
                    name="vehicleType"
                    value={routeRequest.vehicleType}
                    onChange={handleRouteInputChange}
                  >
                    <option value="car">Car</option>
                    <option value="van">Van</option>
                    <option value="truck">Truck</option>
                    <option value="scooter">Scooter</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Optimization Priority</label>
                  <select
                    name="priority"
                    value={routeRequest.priority}
                    onChange={handleRouteInputChange}
                  >
                    <option value="fastest">Fastest Route</option>
                    <option value="shortest">Shortest Distance</option>
                    <option value="eco">Eco-Friendly</option>
                    <option value="safe">Safest Route</option>
                  </select>
                </div>
              </div>
              
              <button onClick={optimizeRoute} className="optimize-button">
                Optimize Route
              </button>
            </div>
            
            {optimizationResult && (
              <div className="optimization-result">
                <h3>Optimization Results</h3>
                <div className="result-grid">
                  <div className="result-card">
                    <h4>Distance</h4>
                    <p>{optimizationResult.distance}</p>
                  </div>
                  <div className="result-card">
                    <h4>Estimated Time</h4>
                    <p>{optimizationResult.estimatedTime}</p>
                  </div>
                  <div className="result-card">
                    <h4>Fuel Savings</h4>
                    <p>{optimizationResult.fuelSavings}</p>
                  </div>
                  <div className="result-card">
                    <h4>Recommended Vehicle</h4>
                    <p>{optimizationResult.recommendedVehicle}</p>
                  </div>
                </div>
                
                <div className="route-visualization">
                  <h4>Recommended Route</h4>
                  <div className="map-container mini-map">
                    <MapContainer
                      center={indiaCenter}
                      zoom={10}
                      style={{ height: '300px', width: '100%' }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      {optimizationResult.route.map((point, index) => (
                        <Marker
                          key={index}
                          position={[point.lat, point.lng]}
                        >
                          <Popup>
                            Point {index + 1}
                          </Popup>
                        </Marker>
                      ))}
                    </MapContainer>
                  </div>
                </div>
              </div>
            )}
          </section>
        ) : activeTab === 'maintenance' ? (
          <section className="maintenance-section">
            <h2>Predictive Maintenance & Health Analytics</h2>
            
            <div className="maintenance-overview">
              <div className="maintenance-stats">
                <h3>Fleet Health Overview</h3>
                <div className="stats-grid">
                  <div className="stat-card">
                    <h4>Healthy</h4>
                    <p className="stat-value healthy">{maintenanceData.find(d => d.status === 'Healthy')?.count || 0}</p>
                  </div>
                  <div className="stat-card">
                    <h4>Due for Service</h4>
                    <p className="stat-value due">{maintenanceData.find(d => d.status === 'Due')?.count || 0}</p>
                  </div>
                  <div className="stat-card">
                    <h4>Critical</h4>
                    <p className="stat-value critical">{maintenanceData.find(d => d.status === 'Critical')?.count || 0}</p>
                  </div>
                </div>
                
                <div className="maintenance-chart">
                  <h4>Maintenance Status Distribution</h4>
                  <div className="chart-container">
                    <div className="pie-chart">
                      {maintenanceData.map((item, index) => {
                        const percentage = (item.count / vehicles.length) * 100;
                        const offset = maintenanceData.slice(0, index).reduce((acc, curr) => acc + (curr.count / vehicles.length) * 100, 0);
                        
                        return (
                          <div 
                            key={item.status}
                            className="pie-segment"
                            style={{
                              backgroundColor: item.color,
                              transform: `rotate(${offset * 3.6}deg)`,
                              clipPath: `conic-gradient(transparent 0deg, transparent ${percentage * 3.6}deg)`
                            }}
                            title={`${item.status}: ${percentage.toFixed(1)}%`}
                          ></div>
                        );
                      })}
                    </div>
                    <div className="chart-legend">
                      {maintenanceData.map(item => (
                        <div key={item.status} className="legend-item">
                          <span className="legend-color" style={{backgroundColor: item.color}}></span>
                          <span>{item.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="maintenance-list">
                <h3>Vehicle Health Details</h3>
                <table className="vehicle-health-table">
                  <thead>
                    <tr>
                      <th>Vehicle</th>
                      <th>Type</th>
                      <th>Engine</th>
                      <th>Tires</th>
                      <th>Brakes</th>
                      <th>Battery</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles.map(vehicle => (
                      <tr key={vehicle.id}>
                        <td>{vehicle.name}</td>
                        <td>{vehicle.type}</td>
                        <td>
                          <div className="health-bar">
                            <div 
                              className="health-fill" 
                              style={{width: `${vehicle.maintenance.engine}%`}}
                            ></div>
                            <span>{vehicle.maintenance.engine}%</span>
                          </div>
                        </td>
                        <td>
                          <div className="health-bar">
                            <div 
                              className="health-fill" 
                              style={{width: `${vehicle.maintenance.tires}%`}}
                            ></div>
                            <span>{vehicle.maintenance.tires}%</span>
                          </div>
                        </td>
                        <td>
                          <div className="health-bar">
                            <div 
                              className="health-fill" 
                              style={{width: `${vehicle.maintenance.brakes}%`}}
                            ></div>
                            <span>{vehicle.maintenance.brakes}%</span>
                          </div>
                        </td>
                        <td>
                          <div className="health-bar">
                            <div 
                              className="health-fill" 
                              style={{width: `${vehicle.maintenance.batteryHealth}%`}}
                            ></div>
                            <span>{vehicle.maintenance.batteryHealth}%</span>
                          </div>
                        </td>
                        <td>
                          <span className={`health-status ${getMaintenanceStatus(vehicle).toLowerCase()}`}>
                            {getMaintenanceStatus(vehicle)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ) : (
          <section className="map-section">
            <div className="map-header">
              <h2>Live Vehicle Tracking - India</h2>
              <div className="vehicle-selector">
                <select 
                  value={selectedVehicle?.id || ''} 
                  onChange={(e) => {
                    const vehicleId = parseInt(e.target.value);
                    const vehicle = vehicles.find(v => v.id === vehicleId);
                    setSelectedVehicle(vehicle || null);
                  }}
                >
                  <option value="">Select a vehicle</option>
                  {vehicles.map(vehicle => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.name} ({getStatusText(vehicle.status)})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="map-container">
              <MapContainer
                center={indiaCenter}
                zoom={5}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {vehicles.map(vehicle => (
                  <Marker
                    key={vehicle.id}
                    position={[vehicle.location.lat, vehicle.location.lng]}
                    icon={vehicleIcons[vehicle.type]}
                  >
                    <Popup>
                      <div>
                        <h3>{vehicle.name}</h3>
                        <p>Type: {vehicle.type}</p>
                        <p>Status: {getStatusText(vehicle.status)}</p>
                        <p>Battery: {vehicle.battery.toFixed(0)}%</p>
                        <p>Speed: {vehicle.speed.toFixed(0)} km/h</p>
                        <p>Location: {getIndianCityName(vehicle.location.lat, vehicle.location.lng)}</p>
                        {canViewSensitive() && (
                          <>
                            <p>Maintenance: {getMaintenanceStatus(vehicle)}</p>
                            <p>Mileage: {vehicle.maintenance.mileage.toFixed(0)} km</p>
                          </>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
            
            {selectedVehicle && (
              <div className="selected-vehicle-info">
                <h3>{selectedVehicle.name} Details</h3>
                <div className="vehicle-details">
                  <div className="detail-row">
                    <span className="label">Type:</span>
                    <span className="value">{selectedVehicle.type.toUpperCase()}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Status:</span>
                    <span className={`value ${getStatusClass(selectedVehicle.status)}`}>
                      {getStatusText(selectedVehicle.status)}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Battery:</span>
                    <span className="value">{selectedVehicle.battery.toFixed(0)}%</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Speed:</span>
                    <span className="value">{selectedVehicle.speed.toFixed(0)} km/h</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Location:</span>
                    <span className="value">
                      {getIndianCityName(selectedVehicle.location.lat, selectedVehicle.location.lng)}
                    </span>
                  </div>
                  {canViewSensitive() && (
                    <>
                      <div className="detail-row">
                        <span className="label">Engine Health:</span>
                        <span className="value">{selectedVehicle.maintenance.engine}%</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Tire Health:</span>
                        <span className="value">{selectedVehicle.maintenance.tires}%</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Brake Health:</span>
                        <span className="value">{selectedVehicle.maintenance.brakes}%</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Maintenance Status:</span>
                        <span className={`value ${getMaintenanceStatus(selectedVehicle).toLowerCase()}`}>
                          {getMaintenanceStatus(selectedVehicle)}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </section>
        )}
      </main>
      
      <footer className="home-footer">
        <p>© 2023 NeuroFleetX India. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Helper function to get Indian city name from coordinates
function getIndianCityName(lat, lng) {
  // Approximate coordinates for major Indian cities
  const cities = [
    { name: "New Delhi", lat: 28.6139, lng: 77.2090 },
    { name: "Mumbai", lat: 19.0760, lng: 72.8777 },
    { name: "Bangalore", lat: 12.9716, lng: 77.5946 },
    { name: "Chennai", lat: 13.0827, lng: 80.2707 },
    { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
    { name: "Hyderabad", lat: 17.3850, lng: 78.4867 },
    { name: "Pune", lat: 18.5204, lng: 73.8567 },
    { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
    { name: "Jaipur", lat: 26.9124, lng: 75.7873 },
    { name: "Lucknow", lat: 26.8467, lng: 80.9462 },
    { name: "Gurugram", lat: 28.4595, lng: 77.0266 },
    { name: "Noida", lat: 28.5355, lng: 77.3910 }
  ];

  // Find the closest city
  let closestCity = cities[0];
  let minDistance = Number.MAX_VALUE;

  for (const city of cities) {
    const distance = Math.sqrt(
      Math.pow(city.lat - lat, 2) + Math.pow(city.lng - lng, 2)
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      closestCity = city;
    }
  }

  // If the distance is small enough, return the city name
  if (minDistance < 1.5) { // Approximately 1.5 degrees (roughly 150km)
    return closestCity.name;
  }

  // Otherwise return coordinates
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
}

export default App;