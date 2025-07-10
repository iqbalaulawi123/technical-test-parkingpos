package com.example.parkingpos.service;

import com.example.parkingpos.dto.GlobalResponseDTO;
import com.example.parkingpos.entity.PaymentTypeEntity;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PaymentTypeService {
    ResponseEntity<GlobalResponseDTO> getAll();
}
