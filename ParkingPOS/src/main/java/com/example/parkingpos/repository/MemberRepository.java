package com.example.parkingpos.repository;

import com.example.parkingpos.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface MemberRepository extends JpaRepository<MemberEntity, String> {
    MemberEntity findByMemberIdOrPhoneNumber(String memberId, String phoneNumber);
}
