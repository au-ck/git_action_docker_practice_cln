package com.klef.dev.controller;

import com.klef.dev.model.Electronics;
import com.klef.dev.service.ElectronicsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/electronics")
public class ElectronicsController {

    @Autowired
    private ElectronicsService electronicsService;

    @GetMapping
    public List<Electronics> getAllElectronics() {
        return electronicsService.getAllElectronics();
    }

    @GetMapping("/{id}")
    public Electronics getElectronicsById(@PathVariable Long id) {
        return electronicsService.getElectronicsById(id);
    }

    @PostMapping
    public Electronics addElectronics(@RequestBody Electronics electronics) {
        return electronicsService.addElectronics(electronics);
    }

    @PutMapping("/{id}")
    public Electronics updateElectronics(@PathVariable Long id, @RequestBody Electronics electronics) {
        return electronicsService.updateElectronics(id, electronics);
    }

    @DeleteMapping("/{id}")
    public void deleteElectronics(@PathVariable Long id) {
        electronicsService.deleteElectronics(id);
    }
}