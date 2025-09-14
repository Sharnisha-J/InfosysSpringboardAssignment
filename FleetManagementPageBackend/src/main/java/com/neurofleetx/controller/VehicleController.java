package com.neurofleetx.controller;

import com.neurofleetx.dto.VehicleDTO;
import com.neurofleetx.model.Vehicle;
import com.neurofleetx.model.VehicleStatus;
import com.neurofleetx.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;  // ✅ use jakarta instead of javax
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    // GET all vehicles
    @GetMapping
    public List<VehicleDTO> getAllVehicles() {
        return vehicleService.getAllVehicles().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // GET vehicle by ID
    @GetMapping("/{id}")
    public ResponseEntity<VehicleDTO> getVehicleById(@PathVariable Long id) {
        return vehicleService.getVehicleById(id)
                .map(vehicle -> ResponseEntity.ok(convertToDTO(vehicle)))
                .orElse(ResponseEntity.notFound().build());
    }

    // CREATE vehicle
    @PostMapping
    public VehicleDTO createVehicle(@Valid @RequestBody VehicleDTO vehicleDTO) {
        Vehicle vehicle = convertToEntity(vehicleDTO);
        Vehicle createdVehicle = vehicleService.createVehicle(vehicle);
        return convertToDTO(createdVehicle);
    }

    // UPDATE vehicle
    @PutMapping("/{id}")
    public ResponseEntity<VehicleDTO> updateVehicle(@PathVariable Long id,
                                                    @Valid @RequestBody VehicleDTO vehicleDTO) {
        try {
            Vehicle vehicle = convertToEntity(vehicleDTO);
            Vehicle updatedVehicle = vehicleService.updateVehicle(id, vehicle);
            return ResponseEntity.ok(convertToDTO(updatedVehicle));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE vehicle
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVehicle(@PathVariable Long id) {
        try {
            vehicleService.deleteVehicle(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // PATCH vehicle status
    @PatchMapping("/{id}/status")
    public ResponseEntity<VehicleDTO> updateVehicleStatus(@PathVariable Long id,
                                                          @RequestParam VehicleStatus status) {
        try {
            Vehicle updatedVehicle = vehicleService.updateVehicleStatus(id, status);
            return ResponseEntity.ok(convertToDTO(updatedVehicle));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // PATCH vehicle location
    @PatchMapping("/{id}/location")
    public ResponseEntity<VehicleDTO> updateVehicleLocation(@PathVariable Long id,
                                                            @RequestParam double latitude,
                                                            @RequestParam double longitude) {
        try {
            Vehicle updatedVehicle = vehicleService.updateVehicleLocation(id, latitude, longitude);
            return ResponseEntity.ok(convertToDTO(updatedVehicle));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // PATCH vehicle battery
    @PatchMapping("/{id}/battery")
    public ResponseEntity<VehicleDTO> updateVehicleBattery(@PathVariable Long id,
                                                           @RequestParam double batteryLevel) {
        try {
            Vehicle updatedVehicle = vehicleService.updateVehicleBattery(id, batteryLevel);
            return ResponseEntity.ok(convertToDTO(updatedVehicle));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // === Mapping helpers ===
    private VehicleDTO convertToDTO(Vehicle vehicle) {
        return new VehicleDTO(
                vehicle.getId(),
                vehicle.getName(),
                vehicle.getType(),
                vehicle.getStatus(),
                vehicle.getBatteryLevel(),
                vehicle.getSpeed(),
                vehicle.getLatitude(),
                vehicle.getLongitude()
        );
    }

    private Vehicle convertToEntity(VehicleDTO vehicleDTO) {
        Vehicle vehicle = new Vehicle();
        vehicle.setName(vehicleDTO.getName());
        vehicle.setType(vehicleDTO.getType());
        vehicle.setStatus(vehicleDTO.getStatus());
        vehicle.setBatteryLevel(vehicleDTO.getBatteryLevel());
        vehicle.setSpeed(vehicleDTO.getSpeed());
        vehicle.setLatitude(vehicleDTO.getLatitude());
        vehicle.setLongitude(vehicleDTO.getLongitude());
        return vehicle;
    }
}
