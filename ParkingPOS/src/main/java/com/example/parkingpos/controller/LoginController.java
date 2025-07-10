package com.example.parkingpos.controller;

import com.example.parkingpos.dto.GlobalResponseDTO;
import com.example.parkingpos.dto.LoginRequestDTO;
import com.example.parkingpos.service.UserTenantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class LoginController {
    private UserTenantService userTenantService;

    public LoginController(UserTenantService userTenantService) {
        this.userTenantService = userTenantService;
    }

    @PostMapping("/login")
    public ResponseEntity<GlobalResponseDTO> login(@RequestBody LoginRequestDTO request){
        return userTenantService.login(request);
    }
}
