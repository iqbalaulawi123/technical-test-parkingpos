package com.example.parkingpos.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Entity
@IdClass(VehicleMemberEntity.VehicleMemberId.class)
@Table(name = "vehicle_member")
public class VehicleMemberEntity {

    @Id
    @Column(name = "vehiclenum")
    private String vehicleNum;

    @Id
    @Column(name = "memberid")
    private String memberId;

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

    // Composite
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class VehicleMemberId implements Serializable {
        private String vehicleNum;
        private String memberId;
    }

    /*
    @ManyToOne
    @JoinColumn(name = "vehiclenum", insertable = false, updatable = false)
    private VehicleEntity vehicle;

    @ManyToOne
    @JoinColumn(name = "memberid", insertable = false, updatable = false)
    private MemberEntity member;
    */
}
