package com.example.parkingpos.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TenantDTO {
    private String tenant_id;
    private String name;
    private LocalDateTime created_date;
    private LocalDateTime updated_date;
    private String updated_by;
    private LocalDateTime deleted_date;
}
