package com.launchcode.dama_devs.controllers;

import com.launchcode.dama_devs.models.Plant;
import com.launchcode.dama_devs.models.data.PlantRepository;
import com.launchcode.dama_devs.services.PlantFilteringService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/plant")
public class PlantController {

    @Autowired
    private PlantRepository plantRepository;

    @Autowired
    private PlantFilteringService plantFilteringService;

    @GetMapping("/{gardenId}/search-plants")
    public ResponseEntity<List<Plant>> getMatchingGardenPlants(@PathVariable Integer gardenId) {
        List<Plant> matchingGardenPlants = plantFilteringService.filterPlantsByGardenFields(gardenId);
        return ResponseEntity.status(HttpStatus.OK).body(matchingGardenPlants);
    }

    @GetMapping("/{plantId}")
    public ResponseEntity<Optional<Plant>> getPlant(@PathVariable Integer plantId) {
        Optional<Plant> plant = plantRepository.findById(plantId);
        return ResponseEntity.status(HttpStatus.OK).body(plant);
    }
}
