package com.neurofleetx.repository;

import com.neurofleetx.model.Vehicle;
import com.neurofleetx.model.VehicleStatus;
import com.neurofleetx.model.VehicleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findByType(VehicleType type);
    List<Vehicle> findByStatus(VehicleStatus status);
    List<Vehicle> findByTypeAndStatus(VehicleType type, VehicleStatus status);
}