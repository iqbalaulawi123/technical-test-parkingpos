package com.example.parkingpos.service.Implementation;

import com.example.parkingpos.dto.GlobalResponseDTO;
import com.example.parkingpos.entity.GateTenantEntity;
import com.example.parkingpos.repository.GateTenantRepostiory;
import com.example.parkingpos.service.GateTenantService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class GateTenantServiceImpl implements GateTenantService {
    private final GateTenantRepostiory gateTenantRepostiory;

    public GateTenantServiceImpl(GateTenantRepostiory gateTenantRepostiory) {
        this.gateTenantRepostiory = gateTenantRepostiory;
    }

    @Override
    public ResponseEntity<GlobalResponseDTO> getAll() {
        List<GateTenantEntity> gateTenants = gateTenantRepostiory.findAll();

        return new ResponseEntity<>(GlobalResponseDTO.builder()
                .timestamp(LocalDateTime.now())
                .message("Get Gate Tenant")
                .status(200)
                .data(gateTenants)
                .build(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<GlobalResponseDTO> getByTypeAndTenant(String type,String tenantId) {
        String gateType = type.toUpperCase();
        List<GateTenantEntity> gateTenants = gateTenantRepostiory.findByGateTypeAndTenant_TenantId(gateType, tenantId);

        return new ResponseEntity<>(GlobalResponseDTO.builder()
                .timestamp(LocalDateTime.now())
                .message("Get Gate Tenant ["+tenantId+"] type "+ gateType)
                .status(200)
                .data(gateTenants)
                .build(), HttpStatus.OK);
    }
}
