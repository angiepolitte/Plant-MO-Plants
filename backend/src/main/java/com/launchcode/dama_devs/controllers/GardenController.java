package com.launchcode.dama_devs.controllers;

import com.launchcode.dama_devs.models.User;
import com.launchcode.dama_devs.models.data.GardenRepository;
import com.launchcode.dama_devs.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import com.launchcode.dama_devs.models.services.GardenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/dashboard")
public class GardenController {

    @Autowired
    private GardenRepository gardenRepository;

    //used for user-garden relationship
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private final GardenService gardenService;

    //Show all gardens in dashboard
    @GetMapping("/")
    public List<Garden> getAllGardens() {
        return gardenService.getAllGardens();
    }

    //Go to a specific garden
    @GetMapping("/{id}")
    public ResponseEntity<Garden> getGardenbyId(@PathVariable Integer id) {
        Garden garden = gardenService.getGardenbyId(id);
        if (garden != null) {
            return ResponseEntity.ok(garden);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    //Create a new garden
    @PostMapping
    public ResponseEntity<Garden> createGarden(@RequestBody Garden garden) {
        Garden savedGarden = gardenService.saveGarden(garden);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedGarden);
    }

    //Update an existing garden
    @PutMapping("/{id}")
    public ResponseEntity<Garden> updateGarden(@PathVariable Integer id, @RequestBody Garden garden) {
        Garden existingGarden = gardenService.saveGarden(garden);

        if (existingGarden != null) {
            garden.setId(id);
            Garden updatedGarden = gardenService.saveGarden(garden);
            return ResponseEntity.ok(updatedGarden);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    //Delete an existing garden
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGarden(@PathVariable Integer id) {
        Garden garden = gardenService.getGardenById(id);
        if (garden != null) {
            gardenService.deleteGarden(id);
            return ResponseEntity.status(HttpStatus.NO_Content).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
