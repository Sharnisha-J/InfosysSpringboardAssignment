package com.neurofleetx.dto;

import com.neurofleetx.model.VehicleStatus;

public class VehicleDTO {
    private Long id;
    private String name;
    private String type;
    private VehicleStatus status;
    private double batteryLevel;
    private double speed;
    private double latitude;
    private double longitude;

    // Constructors
    public VehicleDTO() {}

    public VehicleDTO(Long id, String name, String type, VehicleStatus status, 
                     double batteryLevel, double speed, double latitude, double longitude) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.status = status;
        this.batteryLevel = batteryLevel;
        this.speed = speed;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public VehicleStatus getStatus() { return status; }
    public void setStatus(VehicleStatus status) { this.status = status; }

    public double getBatteryLevel() { return batteryLevel; }
    public void setBatteryLevel(double batteryLevel) { this.batteryLevel = batteryLevel; }

    public double getSpeed() { return speed; }
    public void setSpeed(double speed) { this.speed = speed; }

    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }

    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }
}