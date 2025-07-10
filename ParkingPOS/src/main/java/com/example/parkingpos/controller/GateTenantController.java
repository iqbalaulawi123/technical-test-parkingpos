package com.example.parkingpos.controller;

import com.example.parkingpos.dto.GlobalResponseDTO;
import com.example.parkingpos.service.GateTenantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/gate-tenants")
public class GateTenantController {
    private GateTenantService gateTenantService;

    public GateTenantController(GateTenantService gateTenantService) {
        this.gateTenantService = gateTenantService;
    }

//    @GetMapping
//    public ResponseEntity<GlobalResponseDTO> getAll(){
//        return gateTenantService.getAll();
//    }
    @GetMapping
    public ResponseEntity<GlobalResponseDTO> getByTypeAndTenant(@RequestParam  String type, @RequestParam String tenantId){
        return gateTenantService.getByTypeAndTenant(type,tenantId);
    }
}
