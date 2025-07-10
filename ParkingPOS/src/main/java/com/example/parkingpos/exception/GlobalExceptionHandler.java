package com.example.parkingpos.exception;

import com.example.parkingpos.dto.GlobalResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(MultipleTicketCheckinException.class)
    public ResponseEntity<GlobalResponseDTO> handleCategoryNotFoundException(
            MultipleTicketCheckinException ex, WebRequest request) {

        GlobalResponseDTO globalResponse = GlobalResponseDTO.builder()
                .timestamp(LocalDateTime.now())
                .message(ex.getMessage())
                .status(HttpStatus.CONFLICT.value())
                .data(null)
                .build();
        return new ResponseEntity<>(globalResponse, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(UnathorizedLoginException.class)
    public ResponseEntity<GlobalResponseDTO> handleUnathorizedLoginException(
            UnathorizedLoginException ex, WebRequest request) {

        GlobalResponseDTO globalResponse = GlobalResponseDTO.builder()
                .timestamp(LocalDateTime.now())
                .message(ex.getMessage())
                .status(HttpStatus.UNAUTHORIZED.value())
                .data(null)
                .build();
        return new ResponseEntity<>(globalResponse, HttpStatus.NOT_FOUND);
    }
}
