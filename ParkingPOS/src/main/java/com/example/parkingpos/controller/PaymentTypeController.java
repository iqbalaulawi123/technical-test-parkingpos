package com.example.parkingpos.controller;

import com.example.parkingpos.dto.GlobalResponseDTO;
import com.example.parkingpos.service.PaymentTypeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/payment-types")
public class PaymentTypeController {
    private PaymentTypeService paymentTypeService;

    public PaymentTypeController(PaymentTypeService paymentTypeService) {
        this.paymentTypeService = paymentTypeService;
    }

    @GetMapping
    public ResponseEntity<GlobalResponseDTO> getAll(){
        return paymentTypeService.getAll();
    }
}
