package com.example.parkingpos.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class SummaryTicketResponseDTO {
    private String vehicleNum;
    private String vehicleType;
    private String gateIn;
    private LocalDateTime checkInDate;
    private LocalDateTime checkOutDateScan;
    private BigDecimal rate;
    private String formattedDuration;
    private BigDecimal amount;

}
