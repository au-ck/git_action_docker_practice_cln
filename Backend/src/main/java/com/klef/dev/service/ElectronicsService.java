package com.klef.dev.service;

import com.klef.dev.model.Electronics;
import java.util.List;

public interface ElectronicsService {
    List<Electronics> getAllElectronics();
    Electronics getElectronicsById(Long id);
    Electronics addElectronics(Electronics electronics);
    Electronics updateElectronics(Long id, Electronics electronics);
    void deleteElectronics(Long id);
}