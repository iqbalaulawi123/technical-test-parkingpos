package com.example.parkingpos.dto;

import lombok.Data;

@Data
public class TicketCheckoutRequestDTO {
    private String ticketNum;
    private String tenantId;
    private String gateOut;
    private String paymentTypeId;
    private String memberSearch;
}
