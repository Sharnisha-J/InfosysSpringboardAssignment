package com.neurofleetx.service;

import com.google.maps.DirectionsApi;
import com.google.maps.GeoApiContext;
import com.google.maps.model.DirectionsResult;
import com.google.maps.model.TravelMode;
import com.neurofleetx.model.RouteRequest;
import com.neurofleetx.model.RouteResponse;
import com.neurofleetx.model.RoutePoint;
import com.neurofleetx.model.VehicleType;
import com.neurofleetx.model.RoutePriority;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class RouteOptimizationService {
    @Value("${google.maps.api.key:}")
    private String googleMapsApiKey;
    
    private final Random random = new Random();
    
    public RouteResponse optimizeRoute(RouteRequest request) {
        // Check if we have a Google Maps API key
        if (googleMapsApiKey != null && !googleMapsApiKey.isEmpty() && !googleMapsApiKey.equals("YOUR_GOOGLE_MAPS_API_KEY")) {
            try {
                // Initialize Google Maps context
                GeoApiContext context = new GeoApiContext.Builder()
                    .apiKey(googleMapsApiKey)
                    .build();
                
                // Get directions from Google Maps API
                DirectionsResult directions = DirectionsApi.newRequest(context)
                    .origin(request.getOrigin())
                    .destination(request.getDestination())
                    .mode(TravelMode.DRIVING)
                    .await();
                
                // Process the directions result
                if (directions.routes != null && directions.routes.length > 0) {
                    return processGoogleMapsResponse(directions, request);
                }
            } catch (Exception e) {
                // Fall back to simulated response if Google Maps API fails
                System.err.println("Google Maps API error: " + e.getMessage());
            }
        }
        
        // Simulate AI route optimization if Google Maps is not configured or fails
        return simulateOptimization(request);
    }
    
    private RouteResponse processGoogleMapsResponse(DirectionsResult directions, RouteRequest request) {
        // Extract information from Google Maps response
        String distance = directions.routes[0].legs[0].distance.humanReadable;
        String duration = directions.routes[0].legs[0].duration.humanReadable;
        
        // Convert the route to our format
        RoutePoint[] routePoints = new RoutePoint[directions.routes[0].overviewPolyline.decodePath().size()];
        for (int i = 0; i < routePoints.length; i++) {
            com.google.maps.model.LatLng point = directions.routes[0].overviewPolyline.decodePath().get(i);
            routePoints[i] = new RoutePoint(point.lat, point.lng);
        }
        
        // Calculate fuel savings based on route optimization
        String fuelSavings = calculateFuelSavings(request.getPriority().toString());
        
        return new RouteResponse(
            distance,
            duration,
            fuelSavings,
            request.getVehicleType(),
            routePoints
        );
    }
    
    private RouteResponse simulateOptimization(RouteRequest request) {
        // Simulate AI route optimization
        int distance = random.nextInt(100) + 20; // 20-120 km
        int time = (int) (distance / (random.nextDouble() * 30 + 30) * 60); // minutes
        int savings = random.nextInt(15) + 5; // 5-20% savings
        
        // Create a simulated route
        RoutePoint[] route = {
            new RoutePoint(28.6139, 77.2090), // Delhi
            new RoutePoint(28.4595, 77.0266), // Gurgaon
            new RoutePoint(28.4089, 77.3178)  // Faridabad
        };
        
        return new RouteResponse(
            distance + " km",
            time + " minutes",
            savings + "%",
            request.getVehicleType(),
            route
        );
    }
    
    private String calculateFuelSavings(String priority) {
        // Simple calculation based on priority
        switch (priority) {
            case "ECO":
                return (random.nextInt(10) + 15) + "%"; // 15-25% savings
            case "FASTEST":
                return (random.nextInt(5) + 5) + "%"; // 5-10% savings
            case "SHORTEST":
                return (random.nextInt(8) + 8) + "%"; // 8-16% savings
            case "SAFE":
                return (random.nextInt(7) + 7) + "%"; // 7-14% savings
            default:
                return (random.nextInt(10) + 5) + "%"; // 5-15% savings
        }
    }
}