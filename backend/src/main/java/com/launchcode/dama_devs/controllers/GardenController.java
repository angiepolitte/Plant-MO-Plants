package com.launchcode.dama_devs.controllers;

import com.launchcode.dama_devs.models.dto.GardenPlantDTO;
import com.launchcode.dama_devs.services.GardenPlantService;
import org.springframework.web.bind.annotation.*;
import com.launchcode.dama_devs.models.Garden;
import org.springframework.beans.factory.annotation.Autowired;
import com.launchcode.dama_devs.services.GardenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/garden")
public class GardenController {

    @Autowired
    private GardenPlantService gardenPlantService;
  
    @Autowired
    private GardenService gardenService;

    //Show all gardens in dashboard
    @GetMapping("/{userId}")
    public Iterable<Garden> getGardensByUserId(@PathVariable Integer id) {
        return gardenService.getGardensByUserId(id);
    }

    //Go to a specific garden
    @GetMapping("/{userId}/{gardenId}")
    public ResponseEntity<Garden> getGardenbyId(@PathVariable Integer userId, @PathVariable Integer gardenId) {
        Optional<Garden> garden = gardenService.getGardenById(userId, gardenId);
        return garden.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    //Create a new garden
    @PostMapping
    public ResponseEntity<Garden> createGarden(@PathVariable Integer userId, @PathVariable Integer gardenId, @RequestBody Garden garden) {
        Garden savedGarden = gardenService.saveGarden(userId, gardenId, garden);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedGarden);
    }

    //Update an existing garden's fields with user edits
    @PutMapping("/{userId}/{gardenId}")
    public ResponseEntity<Garden> updateGarden(@PathVariable Integer userId, @PathVariable Integer gardenId, @RequestBody Garden gardenDetail) {
        Garden updatedGarden = gardenService.saveGarden(userId, gardenId, gardenDetail);
        return ResponseEntity.ok(updatedGarden);
    }

    //Delete an existing garden
    @DeleteMapping("/{userId}/{gardenId}")
    public ResponseEntity<Void> deleteGarden(@PathVariable Integer userId, @PathVariable Integer gardenId, @RequestBody Garden garden) {
        Optional<Garden> gardenToDelete = gardenService.getGardenById(userId, gardenId);
        if (gardenToDelete.isPresent()) {
            gardenService.deleteGarden(userId, gardenId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/{gardenId}/add-plant/{plantId}")
    public ResponseEntity<GardenPlantDTO> addPlantToGarden(@PathVariable Integer gardenId, @PathVariable Integer plantId) {
        GardenPlantDTO addPlantToGarden = gardenPlantService.addPlantToGarden(gardenId, plantId);
        return ResponseEntity.status(HttpStatus.CREATED).body(addPlantToGarden);
    }

    @DeleteMapping("/{gardenId}/remove-plants/{plantId}")
    public ResponseEntity<GardenPlantDTO> removePlantFromGarden(@PathVariable Integer gardenId, @PathVariable Integer plantId) {
        GardenPlantDTO removePlantFromGarden = gardenPlantService.removePlantFromGarden(gardenId, plantId);
        return ResponseEntity.status(HttpStatus.OK).body(removePlantFromGarden);
    }
}
