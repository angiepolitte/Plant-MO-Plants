package com.launchcode.dama_devs.controllers;

import com.launchcode.dama_devs.models.dto.GardenPlantDTO;
import com.launchcode.dama_devs.services.AddPlantService;
import org.springframework.web.bind.annotation.*;
import com.launchcode.dama_devs.models.Garden;
import org.springframework.beans.factory.annotation.Autowired;
import com.launchcode.dama_devs.services.GardenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;


@RestController
@RequestMapping("/api/dashboard")
public class GardenController {


    @Autowired
    private AddPlantService addPlantService;

    private GardenService gardenService;

    @Autowired
    public GardenController(GardenService gardenService) {
        this.gardenService = gardenService;
    }

    //Show all gardens in dashboard
    @GetMapping("/")
    public Iterable<Garden> getGardensByUserId(@PathVariable Integer id) {
        return gardenService.getGardensByUserId(id);
    }

    //Go to a specific garden
    @GetMapping("/{id}")
    public ResponseEntity<Garden> getGardenbyId(@PathVariable Integer id) {
        Optional<Garden> garden = gardenService.getGardenById(id);
        return garden.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    //Create a new garden
    @PostMapping
    public ResponseEntity<Garden> createGarden(@RequestBody Garden garden) {
        Garden savedGarden = gardenService.saveGarden(garden);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedGarden);
    }

    //Update an existing garden's fields with user edits
    @PutMapping("/{id}")
    public ResponseEntity<Garden> updateGarden(@PathVariable Integer id, @RequestBody Garden gardenDetail) {
        Optional<Garden> existingGardenCheck = gardenService.getGardenById(id);

        if (existingGardenCheck.isPresent()) {
            Garden existingGarden = existingGardenCheck.get();

            if (gardenDetail.getGardenName() != null) {
                existingGarden.setGardenName(gardenDetail.getGardenName());
            }

            if (gardenDetail.getGardenZone() != null) {
                existingGarden.setGardenZone(gardenDetail.getGardenZone());
            }

            if (gardenDetail.getGardenLight() != null) {
                existingGarden.setGardenLight(gardenDetail.getGardenLight());
            }

            if (gardenDetail.getGardenWater() != null) {
                existingGarden.setGardenWater(gardenDetail.getGardenWater());
            }

            if (gardenDetail.getGardenSoil() != null) {
                existingGarden.setGardenSoil(gardenDetail.getGardenSoil());
            }

            Garden updatedGarden = gardenService.saveGarden(existingGarden);
            return ResponseEntity.ok(updatedGarden);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    //Delete an existing garden
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGarden(@PathVariable Integer id) {
        Optional<Garden> garden = gardenService.getGardenById(id);
        if (garden.isPresent()) {
            gardenService.deleteGarden(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/garden/{gardenId}/add-plants/{plantId}")
    public ResponseEntity<GardenPlantDTO> addPlantToGarden(@PathVariable Integer gardenId, @PathVariable Integer plantId) {
        GardenPlantDTO addPlantToGarden = addPlantService.addPlantToGarden(gardenId, plantId);
        return ResponseEntity.status(HttpStatus.CREATED).body(addPlantToGarden);
    }
}
