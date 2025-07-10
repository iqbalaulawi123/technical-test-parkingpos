package com.example.parkingpos.service;

import com.example.parkingpos.dto.GlobalResponseDTO;
import com.example.parkingpos.dto.ScanTicketRequestDTO;
import com.example.parkingpos.dto.TicketCheckinRequestDTO;
import com.example.parkingpos.dto.TicketCheckoutRequestDTO;
import org.springframework.http.ResponseEntity;

public interface TicketService {
    ResponseEntity<GlobalResponseDTO> getAll();
    ResponseEntity<GlobalResponseDTO> detail(String ticketNum);
    ResponseEntity<GlobalResponseDTO> checkInTicket(TicketCheckinRequestDTO request);
    ResponseEntity<GlobalResponseDTO> checkOutTicket(TicketCheckoutRequestDTO request);
    ResponseEntity<GlobalResponseDTO> scanTicket(ScanTicketRequestDTO request);
}
