package com.klef.dev.service;

import com.klef.dev.model.Electronics;
import com.klef.dev.repository.ElectronicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ElectronicsServiceImpl implements ElectronicsService {

    @Autowired
    private ElectronicRepository electronicsRepository;

    @Override
    public List<Electronics> getAllElectronics() {
        return electronicsRepository.findAll();
    }

    @Override
    public Electronics getElectronicsById(Long id) {
        return electronicsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Electronics not found with id " + id));
    }

    @Override
    public Electronics addElectronics(Electronics electronics) {
        return electronicsRepository.save(electronics);
    }

    @Override
    public Electronics updateElectronics(Long id, Electronics updatedElectronics) {
        Electronics existing = getElectronicsById(id);
        existing.setName(updatedElectronics.getName());
        existing.setBrand(updatedElectronics.getBrand());
        existing.setPrice(updatedElectronics.getPrice());
        existing.setQuantity(updatedElectronics.getQuantity());
        return electronicsRepository.save(existing);
    }

    @Override
    public void deleteElectronics(Long id) {
        electronicsRepository.deleteById(id);
    }
}