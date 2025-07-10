package com.example.parkingpos.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "vehicle")
public class VehicleEntity {

    @Id
    @Column(name = "vehiclenum")
    private String vehicleNum;

    @ManyToOne
    @JoinColumn(name = "vehicletype", referencedColumnName = "vehicletype")
    private VehicleTypeEntity vehicleType;

    @CreationTimestamp
    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @UpdateTimestamp
    @Column(name = "updated_date")
    private LocalDateTime updatedDate;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "deleted_date")
    private LocalDateTime deletedDate;
}
