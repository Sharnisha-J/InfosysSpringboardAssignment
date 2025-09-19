package com.neurofleetx.controller;

import com.neurofleetx.model.RouteRequest;
import com.neurofleetx.model.RouteResponse;
import com.neurofleetx.service.RouteOptimizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/routes")
@CrossOrigin(origins = "*")
public class RouteOptimizationController {
    @Autowired
    private RouteOptimizationService routeOptimizationService;
    
    @PostMapping("/optimize")
    public RouteResponse optimizeRoute(@RequestBody RouteRequest request) {
        return routeOptimizationService.optimizeRoute(request);
    }
}