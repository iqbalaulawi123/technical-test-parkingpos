package com.example.parkingpos.repository;

import com.example.parkingpos.entity.TicketEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface TicketRepository extends JpaRepository<TicketEntity, UUID> {
    List<TicketEntity> findByVehicle_VehicleNumAndTransaction_IsPaidAndTenant_TenantId(String vehicleNum, boolean isPaid, String tenantId);
}
