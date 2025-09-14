package com.neurofleetx.service;

import com.neurofleetx.model.Vehicle;
import com.neurofleetx.model.VehicleStatus;
import com.neurofleetx.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class TelemetrySimulator {
    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private VehicleService vehicleService;

    private final Random random = new Random();

    @Scheduled(fixedRate = 5000) // Run every 5 seconds
    public void simulateTelemetry() {
        List<Vehicle> vehicles = vehicleRepository.findAll();
        
        for (Vehicle vehicle : vehicles) {
            if (vehicle.getStatus() == VehicleStatus.IN_USE) {
                // Simulate small changes for vehicles in use
                double batteryChange = (random.nextDouble() * 2) - 1; // -1 to +1
                double speedChange = (random.nextDouble() * 10) - 5; // -5 to +5
                double latChange = (random.nextDouble() - 0.5) * 0.001;
                double lngChange = (random.nextDouble() - 0.5) * 0.001;
                
                double newBattery = Math.max(0, Math.min(100, vehicle.getBatteryLevel() - batteryChange));
                double newSpeed = Math.max(0, vehicle.getSpeed() + speedChange);
                double newLat = vehicle.getLatitude() + latChange;
                double newLng = vehicle.getLongitude() + lngChange;
                
                vehicle.setBatteryLevel(newBattery);
                vehicle.setSpeed(newSpeed);
                vehicle.setLatitude(newLat);
                vehicle.setLongitude(newLng);
                
                vehicleRepository.save(vehicle);
            }
        }
    }
}