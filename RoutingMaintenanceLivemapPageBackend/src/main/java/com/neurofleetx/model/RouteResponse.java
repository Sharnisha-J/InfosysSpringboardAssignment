package com.neurofleetx.model;

public class RouteResponse {
    private String distance;
    private String estimatedTime;
    private String fuelSavings;
    private VehicleType recommendedVehicle;
    private RoutePoint[] route;

    public RouteResponse() {}

    public RouteResponse(String distance, String estimatedTime, String fuelSavings,
                         VehicleType recommendedVehicle, RoutePoint[] route) {
        this.distance = distance;
        this.estimatedTime = estimatedTime;
        this.fuelSavings = fuelSavings;
        this.recommendedVehicle = recommendedVehicle;
        this.route = route;
    }

    public String getDistance() { return distance; }
    public void setDistance(String distance) { this.distance = distance; }

    public String getEstimatedTime() { return estimatedTime; }
    public void setEstimatedTime(String estimatedTime) { this.estimatedTime = estimatedTime; }

    public String getFuelSavings() { return fuelSavings; }
    public void setFuelSavings(String fuelSavings) { this.fuelSavings = fuelSavings; }

    public VehicleType getRecommendedVehicle() { return recommendedVehicle; }
    public void setRecommendedVehicle(VehicleType recommendedVehicle) { this.recommendedVehicle = recommendedVehicle; }

    public RoutePoint[] getRoute() { return route; }
    public void setRoute(RoutePoint[] route) { this.route = route; }
}
