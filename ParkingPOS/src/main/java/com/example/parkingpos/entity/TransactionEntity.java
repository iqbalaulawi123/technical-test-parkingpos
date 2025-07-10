package com.example.parkingpos.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "transaction")
public class TransactionEntity {

    @Id
    @Column(name = "transactionid")
    private UUID transactionId;

    @Column(name = "amount")
    private BigDecimal amount;
    @ManyToOne
    @JoinColumn(name = "paymenttypeid")
    private PaymentTypeEntity paymentType;

    @Column(name = "ispaid")
    private Boolean isPaid;

    @ManyToOne
    @JoinColumn(name = "memberid")
    private MemberEntity member;

    @Column(name = "duration")
    private Long duration;

    @Column(name = "rate")
    private BigDecimal rate;

    @Column(name = "refid")
    private String refId;

    @UpdateTimestamp
    @Column(name = "updated_date")
    private LocalDateTime updatedDate;
}
