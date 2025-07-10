package com.example.parkingpos.repository;

import com.example.parkingpos.entity.UserTenantEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserTenantRepository extends JpaRepository<UserTenantEntity, UUID> {
    Long countByUsernameAndPassword(String username, String passrordEncoded);

    UserTenantEntity findByUsername(String username);
}
