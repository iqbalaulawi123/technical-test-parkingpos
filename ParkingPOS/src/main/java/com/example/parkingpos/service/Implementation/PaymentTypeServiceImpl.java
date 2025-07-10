package com.example.parkingpos.service.Implementation;

import com.example.parkingpos.dto.GlobalResponseDTO;
import com.example.parkingpos.entity.PaymentTypeEntity;
import com.example.parkingpos.repository.PaymentTypeRepository;
import com.example.parkingpos.service.PaymentTypeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
@Service
public class PaymentTypeServiceImpl implements PaymentTypeService {
    private final PaymentTypeRepository paymentTypeRepository;

    public PaymentTypeServiceImpl(PaymentTypeRepository paymentTypeRepository) {
        this.paymentTypeRepository = paymentTypeRepository;
    }

    @Override
    public ResponseEntity<GlobalResponseDTO> getAll() {
        List<PaymentTypeEntity> paymentTypes = paymentTypeRepository.findAll();
        return new ResponseEntity<>(GlobalResponseDTO.builder()
                .timestamp(LocalDateTime.now())
                .message("Get payment types")
                .status(200)
                .data(paymentTypes)
                .build(), HttpStatus.OK);
    }
}
