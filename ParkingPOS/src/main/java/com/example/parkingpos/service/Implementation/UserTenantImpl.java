package com.example.parkingpos.service.Implementation;

import com.example.parkingpos.dto.GlobalResponseDTO;
import com.example.parkingpos.dto.LoginRequestDTO;
import com.example.parkingpos.entity.UserTenantEntity;
import com.example.parkingpos.exception.UnathorizedLoginException;
import com.example.parkingpos.repository.UserTenantRepository;
import com.example.parkingpos.service.UserTenantService;
import com.example.parkingpos.utils.Helper;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
@Service
public class UserTenantImpl implements UserTenantService {
    private final UserTenantRepository userTenantRepository;
    public UserTenantImpl(UserTenantRepository userTenantRepository) {
        this.userTenantRepository = userTenantRepository;
    }
    @Override
    public ResponseEntity<GlobalResponseDTO> getAll() {

        List<UserTenantEntity> userTenants = userTenantRepository.findAll();

        return new ResponseEntity<>(GlobalResponseDTO.builder()
                .timestamp(LocalDateTime.now())
                .message("Get User Tenants")
                .status(200)
                .data(userTenants)
                .build(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<GlobalResponseDTO> login(LoginRequestDTO request) {
        String passrordEncoded = Helper.hashToMd5(request.getPassword());
        Long findUser = userTenantRepository.countByUsernameAndPassword(request.getUsername(), passrordEncoded);
        if(findUser < 1){
            throw new UnathorizedLoginException();
        }

        UserTenantEntity userTenant = userTenantRepository.findByUsername(request.getUsername());
        return new ResponseEntity<>(GlobalResponseDTO.builder()
                .timestamp(LocalDateTime.now())
                .message("Login user tenants")
                .status(200)
                .data(Collections.singletonList(userTenant))
                .build(), HttpStatus.OK);
    }


}
