package com.neurofleetx.service;

import com.neurofleetx.model.Vehicle;
import com.neurofleetx.model.VehicleStatus;
import com.neurofleetx.model.VehicleType;
import com.neurofleetx.model.Location;
import com.neurofleetx.model.MaintenanceInfo;
import com.neurofleetx.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class VehicleService {
    @Autowired
    private VehicleRepository vehicleRepository;
    
    private final Random random = new Random();
    
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }
    
    public Optional<Vehicle> getVehicleById(Long id) {
        return vehicleRepository.findById(id);
    }
    
    public List<Vehicle> getVehiclesByType(String type) {
        return vehicleRepository.findByType(VehicleType.valueOf(type.toUpperCase()));
    }
    
    public List<Vehicle> getVehiclesByStatus(String status) {
        return vehicleRepository.findByStatus(VehicleStatus.valueOf(status.toUpperCase()));
    }
    
    public Vehicle createVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }
    
    public Vehicle updateVehicle(Long id, Vehicle vehicleDetails) {
        return vehicleRepository.findById(id).map(vehicle -> {
            vehicle.setName(vehicleDetails.getName());
            vehicle.setType(vehicleDetails.getType());
            vehicle.setStatus(vehicleDetails.getStatus());
            vehicle.setBatteryLevel(vehicleDetails.getBatteryLevel());
            vehicle.setLocation(vehicleDetails.getLocation());
            vehicle.setSpeed(vehicleDetails.getSpeed());
            vehicle.setMaintenance(vehicleDetails.getMaintenance());
            return vehicleRepository.save(vehicle);
        }).orElseThrow(() -> new RuntimeException("Vehicle not found with id: " + id));
    }
    
    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }
    
    // Simulate telemetry updates every 3 seconds
    @Scheduled(fixedRate = 3000)
    public void updateVehicleTelemetry() {
        List<Vehicle> vehicles = vehicleRepository.findAll();
        
        for (Vehicle vehicle : vehicles) {
            if (vehicle.getStatus() == VehicleStatus.IN_USE) {
                // Simulate small changes for vehicles in use
                double batteryChange = (random.nextDouble() * 2) - 1; // -1 to +1
                double speedChange = (random.nextDouble() * 10) - 5; // -5 to +5
                double latChange = (random.nextDouble() - 0.5) * 0.001;
                double lngChange = (random.nextDouble() - 0.5) * 0.001;
                
                vehicle.setBatteryLevel(Math.max(0, Math.min(100, vehicle.getBatteryLevel() - batteryChange)));
                vehicle.setSpeed(Math.max(0, vehicle.getSpeed() + speedChange));
                
                Location location = vehicle.getLocation();
                location.setLatitude(location.getLatitude() + latChange);
                location.setLongitude(location.getLongitude() + lngChange);
                vehicle.setLocation(location);
                
                // Update maintenance info
                MaintenanceInfo maintenance = vehicle.getMaintenance();
                maintenance.setBatteryHealth((int) Math.max(0, Math.min(100, maintenance.getBatteryHealth() - batteryChange/10)));
                maintenance.setMileage(maintenance.getMileage() + (vehicle.getSpeed() / 60)); // Simulate mileage increase
                vehicle.setMaintenance(maintenance);
                
                vehicleRepository.save(vehicle);
            }
        }
    }
}