package com.example.parkingpos.service.Implementation;

import com.example.parkingpos.dto.*;
import com.example.parkingpos.entity.*;
import com.example.parkingpos.exception.MultipleTicketCheckinException;
import com.example.parkingpos.exception.TicketAlreadyPaidException;
import com.example.parkingpos.repository.*;
import com.example.parkingpos.service.TicketService;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import com.example.parkingpos.utils.Helper;
@Service
@Slf4j
public class TicketServiceImpl implements TicketService {
    private final TicketRepository ticketRepository;
    private final GateTenantRepostiory gateTenantRepostiory;
    private final VehicleRepository vehicleRepository;
    private final VehicleTypeRepository vehicleTypeRepository;
    private final TransactionRepository transactionRepository;
    private final MemberRepository memberRepository;
    private final PaymentTypeRepository paymentTypeRepository;

    public TicketServiceImpl(TicketRepository ticketRepository, GateTenantRepostiory gateTenantRepostiory, VehicleRepository vehicleRepository, VehicleTypeRepository vehicleTypeRepository, TransactionRepository transactionRepository, MemberRepository memberRepository, PaymentTypeRepository paymentTypeRepository) {
        this.ticketRepository = ticketRepository;
        this.gateTenantRepostiory = gateTenantRepostiory;
        this.vehicleRepository = vehicleRepository;
        this.vehicleTypeRepository = vehicleTypeRepository;
        this.transactionRepository = transactionRepository;
        this.memberRepository = memberRepository;
        this.paymentTypeRepository = paymentTypeRepository;
    }

    @Override
    public ResponseEntity<GlobalResponseDTO> getAll() {
        List<TicketEntity> tickets = ticketRepository.findAll();
        return new ResponseEntity<>(GlobalResponseDTO.builder()
                .timestamp(LocalDateTime.now())
                .message("Get Tickets")
                .status(200)
                .data(tickets)
                .build(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<GlobalResponseDTO> detail(String ticketNum) {
        TicketEntity ticketDetail = ticketRepository.findById(UUID.fromString(ticketNum))
                .orElseThrow(() -> new EntityNotFoundException("ticket not found"));

        return new ResponseEntity<>(GlobalResponseDTO.builder()
                .timestamp(LocalDateTime.now())
                .message("Get detail ticket")
                .status(200)
                .data(Collections.singletonList((ticketDetail)))
                .build(), HttpStatus.OK);
    }

    @Override
    @Transactional
    public ResponseEntity<GlobalResponseDTO> checkInTicket(TicketCheckinRequestDTO request) {
        VehicleEntity vehicle = new VehicleEntity();
        long checkVehicle = vehicleRepository.countByVehicleNum(request.getVehicleNum());
        if (checkVehicle < 1) {
            VehicleTypeEntity vehicleType = vehicleTypeRepository.findById(request.getVehicleType())
                    .orElseThrow(() -> new EntityNotFoundException("Vehicle Type not found"));
            vehicle.setVehicleNum(request.getVehicleNum());
            vehicle.setVehicleType(vehicleType);
            vehicleRepository.save(vehicle);
        } else {
            vehicle = vehicleRepository.findById(request.getVehicleNum())
                    .orElseThrow(() -> new EntityNotFoundException("Vehicle not found"));
        }

        GateTenantEntity gateTenant = gateTenantRepostiory.findById(request.getGateId())
                .orElseThrow(() -> new EntityNotFoundException("Gate not found"));


        //check multiple checkin
        List<TicketEntity> checkMultipleTicket = ticketRepository.findByVehicle_VehicleNumAndTransaction_IsPaidAndTenant_TenantId(request.getVehicleNum(), false, request.getTenantId());
        if(!checkMultipleTicket.isEmpty()){
            throw new MultipleTicketCheckinException(request.getVehicleNum());
        }

        TransactionEntity transaction = new TransactionEntity();
        transaction.setTransactionId(UUID.randomUUID());
        transaction.setRate(BigDecimal.valueOf(3000));
        transaction.setIsPaid(false);
        transactionRepository.save(transaction);

        TicketEntity ticketRow = new TicketEntity();
        ticketRow.setNoTicket(UUID.randomUUID());
        ticketRow.setInDate(LocalDateTime.now());
        ticketRow.setOutDate(null);
        ticketRow.setGateIn(gateTenant);
        ticketRow.setGateOut(null);
        ticketRow.setVehicle(vehicle);
        ticketRow.setTenant(gateTenant.getTenant());
        ticketRow.setTransaction(transaction);
        ticketRepository.save(ticketRow);

        return new ResponseEntity<>(GlobalResponseDTO.builder()
                .timestamp(LocalDateTime.now())
                .message("Success Check-in")
                .status(200)
                .data(Collections.singletonList(ticketRow))
                .build(), HttpStatus.OK);
    }
    @Override
    @Transactional
    public ResponseEntity<GlobalResponseDTO> checkOutTicket(TicketCheckoutRequestDTO request){
        MemberEntity memberData = new MemberEntity();
        if(!request.getMemberSearch().equals("") || request.getMemberSearch().isEmpty()){
            memberData = memberRepository.findByMemberIdOrPhoneNumber(request.getMemberSearch(),request.getMemberSearch());
        }

        GateTenantEntity gateOut = gateTenantRepostiory.findById(request.getGateOut())
                .orElseThrow(() -> new EntityNotFoundException("Gate not found"));
        PaymentTypeEntity paymentType = paymentTypeRepository.findById(request.getPaymentTypeId())
                .orElseThrow(() -> new EntityNotFoundException("PaymentType not found"));
        TicketEntity ticketRow = ticketRepository.findById(UUID.fromString(request.getTicketNum()))
                .orElseThrow(() -> new EntityNotFoundException("Ticket Not Found"));

        //check tiket sudah dibayar
        if(ticketRow.getTransaction().getIsPaid().equals(true)){
            throw new TicketAlreadyPaidException();
        }

        Long finalDurationInSecond = Helper.calculateSecondFromInOutRange(ticketRow.getInDate(),ticketRow.getOutDateScan());
        BigDecimal finalPrice = Helper.calculatePriceByRateAndSeconds(ticketRow.getTransaction().getRate(), finalDurationInSecond);

        ticketRow.setGateOut(gateOut);
        ticketRow.setOutDate(LocalDateTime.now());
        ticketRepository.save(ticketRow);

        TransactionEntity transactionRow = ticketRow.getTransaction();
        transactionRow.setAmount(finalPrice);
        transactionRow.setPaymentType(paymentType);
        transactionRow.setIsPaid(true);
        transactionRow.setMember(memberData);
        transactionRow.setDuration(finalDurationInSecond);
        transactionRow.setUpdatedDate(LocalDateTime.now());
        transactionRepository.save(transactionRow);

        return new ResponseEntity<>(GlobalResponseDTO.builder()
                .timestamp(LocalDateTime.now())
                .message("Success Check-out")
                .status(200)
                .data(Collections.singletonList(ticketRow))
                .build(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<GlobalResponseDTO> scanTicket(ScanTicketRequestDTO request) {
        TicketEntity ticketDetail = ticketRepository.findById(UUID.fromString(request.getTicketNum()))
                .orElseThrow(() -> new EntityNotFoundException("ticket not found"));

        //check tiket sudah dibayar
        if(ticketDetail.getTransaction().getIsPaid().equals(true)){
            throw new TicketAlreadyPaidException();
        }

        LocalDateTime nowDate = LocalDateTime.now();

        ticketDetail.setOutDateScan(nowDate);
        TicketEntity updatedTicket = ticketRepository.save(ticketDetail);

        Long finalDurationInSecond = Helper.calculateSecondFromInOutRange(updatedTicket.getInDate(),updatedTicket.getOutDateScan());
        BigDecimal finalPrice = Helper.calculatePriceByRateAndSeconds(updatedTicket.getTransaction().getRate(), finalDurationInSecond);
        String finalDurationFormatted = Helper.calculateSecondFromInOutRangeFormatted(updatedTicket.getInDate(),updatedTicket.getOutDateScan());

        SummaryTicketResponseDTO response = new SummaryTicketResponseDTO();
        response.setVehicleNum(updatedTicket.getVehicle().getVehicleNum());
        response.setVehicleType(updatedTicket.getVehicle().getVehicleType().getVehicleType());
        response.setRate(updatedTicket.getTransaction().getRate());
        response.setGateIn(updatedTicket.getGateIn().getGateId());
        response.setFormattedDuration(finalDurationFormatted);
        response.setCheckInDate(updatedTicket.getInDate());
        response.setCheckOutDateScan(updatedTicket.getOutDateScan());
        response.setAmount(finalPrice);

        return new ResponseEntity<>(GlobalResponseDTO.builder()
                .timestamp(LocalDateTime.now())
                .message("Scan ticket success")
                .status(200)
                .data(Collections.singletonList((response)))
                .build(), HttpStatus.OK);
    }


}
