package com.example.personsbackend.controller;

import com.example.personsbackend.model.Settings;
import com.example.personsbackend.repository.SettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = "http://localhost:4200")
public class SettingsController {

    @Autowired
    private SettingsRepository settingsRepository;

    @GetMapping
    public ResponseEntity<Settings> getLatestSettings() {
        List<Settings> all = settingsRepository.findAll();
        if (all.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Settings latest = all.get(all.size() - 1);
        return ResponseEntity.ok(latest);
    }

    @PostMapping
    public ResponseEntity<Settings> saveSettings(@RequestBody String jsonData) {
        Settings settings = new Settings(jsonData);
        Settings saved = settingsRepository.save(settings);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}

