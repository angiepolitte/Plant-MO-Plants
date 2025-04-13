package com.launchcode.dama_devs.controllers;

import com.launchcode.dama_devs.models.dto.PlantRatingDTO;
import com.launchcode.dama_devs.services.PlantRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/plant-detail")
public class RatingController {

    @Autowired
    private PlantRatingService plantRatingService;

    @PostMapping("/{plantRating}/{userId}/{plantId}")
    public ResponseEntity<PlantRatingDTO> createPlantRating(@PathVariable Integer plantRating, @PathVariable Integer userId, @PathVariable Integer plantId) {
        PlantRatingDTO createPlantRating = plantRatingService.createPlantRating(plantRating, userId, plantId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createPlantRating);
    }
}