package com.example.parkingpos.service.Implementation;

import com.example.parkingpos.dto.GlobalResponseDTO;
import com.example.parkingpos.entity.VehicleTypeEntity;
import com.example.parkingpos.repository.VehicleTypeRepository;
import com.example.parkingpos.service.VehicleTypeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class VehicleTypeServiceImpl implements VehicleTypeService {
    private final VehicleTypeRepository vehicleTypeRepository;

    public VehicleTypeServiceImpl(VehicleTypeRepository vehicleTypeRepository) {
        this.vehicleTypeRepository = vehicleTypeRepository;
    }

    @Override
    public ResponseEntity<GlobalResponseDTO> getAll() {
        List<VehicleTypeEntity> vehicleTypes = vehicleTypeRepository.findAll();

        return new ResponseEntity<>(GlobalResponseDTO.builder()
                .timestamp(LocalDateTime.now())
                .message("Get Vehicle Types")
                .status(200)
                .data(vehicleTypes)
                .build(), HttpStatus.OK);
    }
}
