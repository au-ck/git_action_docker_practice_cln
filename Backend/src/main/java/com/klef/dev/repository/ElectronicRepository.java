package com.klef.dev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.klef.dev.model.Electronics;

@Repository
public interface ElectronicRepository extends JpaRepository<Electronics, Long> {
}