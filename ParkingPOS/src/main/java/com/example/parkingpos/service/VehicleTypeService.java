package com.example.parkingpos.service;

import com.example.parkingpos.dto.GlobalResponseDTO;
import org.springframework.http.ResponseEntity;

public interface VehicleTypeService {
    ResponseEntity<GlobalResponseDTO> getAll();
}
