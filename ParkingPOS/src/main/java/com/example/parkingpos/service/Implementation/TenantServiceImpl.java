package com.example.parkingpos.service.Implementation;

import com.example.parkingpos.dto.GlobalResponseDTO;
import com.example.parkingpos.entity.TenantEntity;
import com.example.parkingpos.repository.TenantRepository;
import com.example.parkingpos.service.TenantService;
import com.example.parkingpos.utils.Helper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
public class TenantServiceImpl implements TenantService {
    private final TenantRepository tenantRepository;

    public TenantServiceImpl(TenantRepository tenantRepository) {
        this.tenantRepository = tenantRepository;
    }

    @Override
    public ResponseEntity<GlobalResponseDTO> getAll() {
        List<TenantEntity> tenants = tenantRepository.findAll();

        return new ResponseEntity<>(GlobalResponseDTO.builder()
                .timestamp(LocalDateTime.now())
                .message("Get Tenants")
                .status(200)
                .data(tenants)
                .build(), HttpStatus.OK);
    }
}

