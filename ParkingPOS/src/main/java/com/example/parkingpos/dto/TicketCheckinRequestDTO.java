package com.example.parkingpos.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class TicketCheckinRequestDTO {
    private String vehicleNum;
    private String vehicleType;
    private String tenantId;
    private String gateId;
}
