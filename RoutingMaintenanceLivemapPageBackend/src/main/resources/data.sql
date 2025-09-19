-- Insert initial users
INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@neurofleetx.com', '$2a$10$rOzJNs8E4oYfG6C5s2QzO.DlT.7MkY6q9XxZ8vL7rN3pV1sW2yB0u', 'ADMIN'),
('Fleet Manager', 'manager@neurofleetx.com', '$2a$10$rOzJNs8E4oYfG6C5s2QzO.DlT.7MkY6q9XxZ8vL7rN3pV1sW2yB0u', 'MANAGER'),
('Operator', 'operator@neurofleetx.com', '$2a$10$rOzJNs8E4oYfG6C5s2QzO.DlT.7MkY6q9XxZ8vL7rN3pV1sW2yB0u', 'OPERATOR'),
('Viewer', 'viewer@neurofleetx.com', '$2a$10$rOzJNs8E4oYfG6C5s2QzO.DlT.7MkY6q9XxZ8vL7rN3pV1sW2yB0u', 'VIEWER');

-- Insert sample vehicles
INSERT INTO vehicles (name, type, status, battery_level, location_latitude, location_longitude, speed, maintenance_engine_health, maintenance_tires_health, maintenance_brakes_health, maintenance_battery_health, maintenance_mileage) VALUES 
('Tata Nexon EV', 'CAR', 'IN_USE', 78, 28.6139, 77.2090, 45, 85, 70, 90, 78, 12500),
('Mahindra eVerito', 'CAR', 'IDLE', 92, 28.4595, 77.0266, 0, 92, 85, 88, 92, 8700),
('Ashok Leyland Dost', 'TRUCK', 'MAINTENANCE', 34, 12.9716, 77.5946, 0, 45, 30, 60, 34, 32500),
('Ola S1 Pro', 'SCOOTER', 'IDLE', 100, 19.0760, 72.8777, 0, 95, 90, 92, 100, 3200),
('Tata Tigor EV', 'CAR', 'IN_USE', 65, 13.0827, 80.2707, 38, 80, 75, 82, 65, 15200),
('Mahindra eSupro', 'VAN', 'IDLE', 88, 22.5726, 88.3639, 0, 88, 80, 85, 88, 18500);