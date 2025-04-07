package com.launchcode.dama_devs.services;

import com.launchcode.dama_devs.models.Plant;
import com.launchcode.dama_devs.models.PlantRating;
import com.launchcode.dama_devs.models.User;
import com.launchcode.dama_devs.models.data.PlantRatingRepository;
import com.launchcode.dama_devs.models.data.PlantRepository;
import com.launchcode.dama_devs.models.data.UserRepository;
import com.launchcode.dama_devs.models.dto.PlantRatingDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PlantRatingService {

    @Autowired
    private PlantRepository plantRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlantRatingRepository plantRatingRepository;


    public PlantRatingDTO createPlantRating(int plantRating, Integer userId, Integer plantId) {

        //get the user id
        Optional<User> userResult = userRepository.findById(userId);
        if (!userResult.isPresent()) {
            throw new IllegalArgumentException("User not found with ID:" + userId);
        }
        User user = userResult.get();

        //get the plant id
        Optional<Plant> plantResult = plantRepository.findById(plantId);
        if (!plantResult.isPresent()) {
            throw new IllegalArgumentException("Plant not found with ID:" + plantId);
        }
        Plant plant = plantResult.get();

        //use constructor to create a new plant rating and save it to the repository
        PlantRating rating = new PlantRating(plantRating, user, plant);
        plantRatingRepository.save(rating);

        //create a new plantRating DTO
        PlantRatingDTO plantRatingDTO = new PlantRatingDTO();
        plantRatingDTO.setPlantRating(rating.getPlantRating());
        plantRatingDTO.setUserId(userId);
        plantRatingDTO.setPlantId(plantId);

        return plantRatingDTO;
    }
}

