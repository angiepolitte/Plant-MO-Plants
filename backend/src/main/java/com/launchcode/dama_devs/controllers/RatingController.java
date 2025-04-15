package com.launchcode.dama_devs.controllers;

import com.launchcode.dama_devs.models.dto.AverageRatingDTO;
import com.launchcode.dama_devs.models.dto.PlantRatingDTO;
import com.launchcode.dama_devs.services.PlantRatingService;
import com.launchcode.dama_devs.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/plant-rating")
public class RatingController {

    @Autowired
    private PlantRatingService plantRatingService;

    @GetMapping("/current-rating/{plantId}")
    public ResponseEntity<PlantRatingDTO> plantRatingDto(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Integer plantId) {
        PlantRatingDTO getRating = plantRatingService.getRating(userDetails.getId(), plantId);
        return ResponseEntity.status(HttpStatus.OK).body(getRating);
    }

    @GetMapping("/{plantId}/average-rating")
    public ResponseEntity<AverageRatingDTO> averageRating(@PathVariable Integer plantId){
        AverageRatingDTO averageRating = plantRatingService.calculateAverageRating(plantId);
    return ResponseEntity.status(HttpStatus.OK).body(averageRating);
    }

    @PostMapping("/create")
    public ResponseEntity<PlantRatingDTO> createPlantRating(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody PlantRatingDTO plantRatingDto) {
        PlantRatingDTO createPlantRating = plantRatingService.createPlantRating(userDetails.getId(), plantRatingDto.getPlantRating(), plantRatingDto.getPlantId());
        return ResponseEntity.status(HttpStatus.CREATED).body(createPlantRating);
    }
}