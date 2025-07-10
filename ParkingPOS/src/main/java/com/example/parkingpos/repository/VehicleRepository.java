package com.example.parkingpos.repository;

import com.example.parkingpos.entity.VehicleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepository extends JpaRepository<VehicleEntity, String> {
    long countByVehicleNum(String vehicleNum);
}
