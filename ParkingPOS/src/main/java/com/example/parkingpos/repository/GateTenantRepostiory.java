package com.example.parkingpos.repository;

import com.example.parkingpos.entity.GateTenantEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface GateTenantRepostiory extends JpaRepository<GateTenantEntity, String> {
    List<GateTenantEntity> findGateTenantEntitiesByGateId(String tenantId);
    List<GateTenantEntity> findByGateTypeAndTenant_TenantId(String type, String tenantId);
}
