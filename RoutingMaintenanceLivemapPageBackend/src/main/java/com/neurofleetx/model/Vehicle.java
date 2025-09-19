package com.neurofleetx.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "vehicles")
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    private String name;
    
    @Enumerated(EnumType.STRING)
    private VehicleType type;
    
    @Enumerated(EnumType.STRING)
    private VehicleStatus status;
    
    private double batteryLevel;
    
    @Embedded
    private Location location;
    
    private double speed;
    
    @Embedded
    private MaintenanceInfo maintenance;
    
    // Constructors, getters, and setters
    public Vehicle() {}
    
    public Vehicle(String name, VehicleType type, VehicleStatus status, 
                  double batteryLevel, Location location, double speed, 
                  MaintenanceInfo maintenance) {
        this.name = name;
        this.type = type;
        this.status = status;
        this.batteryLevel = batteryLevel;
        this.location = location;
        this.speed = speed;
        this.maintenance = maintenance;
    }
    
    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public VehicleType getType() { return type; }
    public void setType(VehicleType type) { this.type = type; }
    
    public VehicleStatus getStatus() { return status; }
    public void setStatus(VehicleStatus status) { this.status = status; }
    
    public double getBatteryLevel() { return batteryLevel; }
    public void setBatteryLevel(double batteryLevel) { this.batteryLevel = batteryLevel; }
    
    public Location getLocation() { return location; }
    public void setLocation(Location location) { this.location = location; }
    
    public double getSpeed() { return speed; }
    public void setSpeed(double speed) { this.speed = speed; }
    
    public MaintenanceInfo getMaintenance() { return maintenance; }
    public void setMaintenance(MaintenanceInfo maintenance) { this.maintenance = maintenance; }
}