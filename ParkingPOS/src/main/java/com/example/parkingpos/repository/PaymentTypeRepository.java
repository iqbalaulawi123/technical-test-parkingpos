package com.example.parkingpos.repository;

import com.example.parkingpos.entity.PaymentTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentTypeRepository extends JpaRepository<PaymentTypeEntity, String> {
}
