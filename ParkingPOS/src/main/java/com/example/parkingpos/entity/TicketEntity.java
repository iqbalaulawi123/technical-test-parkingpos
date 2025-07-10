package com.example.parkingpos.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "ticket")
public class TicketEntity {

    @Id
    @Column(name = "noticket")
    private UUID noTicket;

    @ManyToOne
    @JoinColumn(name = "vehiclenum")
    private VehicleEntity vehicle;

    @Column(name = "indate")
    private LocalDateTime inDate;

    @Column(name = "outdate")
    private LocalDateTime outDate;
    @Column(name = "outdate_scan")
    private LocalDateTime outDateScan;

    @ManyToOne
    @JoinColumn(name = "gatein")
    private GateTenantEntity gateIn;

    @ManyToOne
    @JoinColumn(name = "gateout")
    private GateTenantEntity gateOut;

    @ManyToOne
    @JoinColumn(name = "tenant_id")
    @JsonIgnoreProperties({"gates"})
    private TenantEntity tenant;

    @OneToOne
    @JoinColumn(name = "transactionid")
    private TransactionEntity transaction;
}
