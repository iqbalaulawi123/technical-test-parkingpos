package com.example.parkingpos.service;

import com.example.parkingpos.dto.GlobalResponseDTO;
import org.springframework.http.ResponseEntity;

public interface TenantService {
    ResponseEntity<GlobalResponseDTO> getAll();
}
