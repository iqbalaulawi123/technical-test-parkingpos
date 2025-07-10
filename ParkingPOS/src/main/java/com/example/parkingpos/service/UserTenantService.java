package com.example.parkingpos.service;

import com.example.parkingpos.dto.GlobalResponseDTO;
import com.example.parkingpos.dto.LoginRequestDTO;
import org.springframework.http.ResponseEntity;


public interface UserTenantService {
    ResponseEntity<GlobalResponseDTO> getAll();

    ResponseEntity<GlobalResponseDTO> login(LoginRequestDTO request);
}
