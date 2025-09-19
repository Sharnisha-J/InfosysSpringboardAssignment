package com.neurofleetx;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class RoutingMaintenanceLivemapBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(RoutingMaintenanceLivemapBackendApplication.class, args);
    }
}