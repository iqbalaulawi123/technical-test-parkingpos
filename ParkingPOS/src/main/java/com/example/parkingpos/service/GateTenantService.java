package com.example.parkingpos.service;

import com.example.parkingpos.dto.GlobalResponseDTO;
import org.springframework.http.ResponseEntity;

public interface GateTenantService {
    ResponseEntity<GlobalResponseDTO> getAll();

    ResponseEntity<GlobalResponseDTO> getByTypeAndTenant(String type,String tenantId);
}
