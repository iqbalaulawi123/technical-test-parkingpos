package com.example.parkingpos.controller;

import com.example.parkingpos.dto.GlobalResponseDTO;
import com.example.parkingpos.service.UserTenantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user-tenants")
public class UserTenantController {
    private UserTenantService userTenantService;

    public UserTenantController(UserTenantService userTenantService) {
        this.userTenantService = userTenantService;
    }

    @GetMapping
    public ResponseEntity<GlobalResponseDTO> getAll(){
        return userTenantService.getAll();
    }


}
