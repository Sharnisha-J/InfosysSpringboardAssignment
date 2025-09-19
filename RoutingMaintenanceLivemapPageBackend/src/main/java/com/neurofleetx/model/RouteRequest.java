package com.neurofleetx.model;

public class RouteRequest {
    private String origin;
    private String destination;
    private VehicleType vehicleType;
    private RoutePriority priority;

    public RouteRequest() {}

    public RouteRequest(String origin, String destination, VehicleType vehicleType, RoutePriority priority) {
        this.origin = origin;
        this.destination = destination;
        this.vehicleType = vehicleType;
        this.priority = priority;
    }

    public String getOrigin() { return origin; }
    public void setOrigin(String origin) { this.origin = origin; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public VehicleType getVehicleType() { return vehicleType; }
    public void setVehicleType(VehicleType vehicleType) { this.vehicleType = vehicleType; }

    public RoutePriority getPriority() { return priority; }
    public void setPriority(RoutePriority priority) { this.priority = priority; }
}
