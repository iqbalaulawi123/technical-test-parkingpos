package com.example.parkingpos.controller;

import com.example.parkingpos.dto.GlobalResponseDTO;
import com.example.parkingpos.dto.ScanTicketRequestDTO;
import com.example.parkingpos.dto.TicketCheckinRequestDTO;
import com.example.parkingpos.dto.TicketCheckoutRequestDTO;
import com.example.parkingpos.service.TicketService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/tickets")
@Slf4j
public class TicketController {
    private TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping
    public ResponseEntity<GlobalResponseDTO> getAll(){
        return ticketService.getAll();
    }
    @GetMapping("/{ticketNum}")
    public ResponseEntity<GlobalResponseDTO> detail(@PathVariable String ticketNum){
        return ticketService.detail(ticketNum);
    }
    @PostMapping("/check-in")
    public ResponseEntity<GlobalResponseDTO> checkInTicket(@RequestBody TicketCheckinRequestDTO request){
        return ticketService.checkInTicket(request);
    }
    @PostMapping("/check-out")
    public ResponseEntity<GlobalResponseDTO> checkOutTicket(@RequestBody TicketCheckoutRequestDTO request) {
        return ticketService.checkOutTicket(request);
    }
    @PostMapping("/scan")
    public ResponseEntity<GlobalResponseDTO> scanTicket(@RequestBody ScanTicketRequestDTO request){
        return ticketService.scanTicket(request);
    }


}
