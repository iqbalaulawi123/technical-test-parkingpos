package com.example.parkingpos.dto;

import lombok.Data;

@Data
public class LoginResponseDTO {
    private String username;
    private String tenant_id;
    private String tenant_name;
}
