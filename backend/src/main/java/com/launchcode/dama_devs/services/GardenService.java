package com.launchcode.dama_devs.services;

import com.launchcode.dama_devs.models.User;
import com.launchcode.dama_devs.models.data.GardenRepository;
import com.launchcode.dama_devs.models.data.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.launchcode.dama_devs.models.Garden;
import java.util.Optional;

@Service
public class GardenService {

    //Creates an instance of the variable
    private GardenRepository gardenRepository;

    private UserRepository userRepository;

    @Autowired
    public GardenService(GardenRepository gardenRepository, UserRepository userRepository) {
        this.gardenRepository = gardenRepository;
        this.userRepository = userRepository;
    }

    //Get all user's gardens in main dashboard
    public Iterable<Garden> getGardensByUserId(Integer userId) {
        return gardenRepository.findByUserId(userId);
    }

    //Get a specific user garden (display in garden detail page)
    public Optional<Garden> getGardenById(Integer userId, Integer gardenId) {

        Iterable<Garden> gardens = gardenRepository.findByUserId(userId);

        for (Garden garden : gardens) {
            if (garden.getId() == gardenId) {
                return Optional.of(garden);  // Return the garden wrapped in Optional
            }
        }
        return Optional.empty();
    }

    //Checks to see if a garden exists. If it does, updates the existing garden. If it does not, creates a new garden.
    public Garden saveGarden(Integer userId, Integer gardenId, Garden newGarden) {

        Optional<User> userOptional = userRepository.findById(userId);

        Iterable<Garden> gardens = gardenRepository.findByUserId(userId);

        if (!userOptional.isPresent()) {
            throw new EntityNotFoundException("User with ID" + userId + "not found.");
        } else {
            User user = userOptional.get(); // Get the user object

            for (Garden garden : gardens) { // Iterates through the all the gardens with the User id specified above.
                if (garden.getId() == gardenId) { // If the garden already exists for this User, update details (lines 45-49).
                    garden.setGardenName(newGarden.getGardenName());
                    garden.setGardenZone(newGarden.getGardenZone());
                    garden.setGardenLight(newGarden.getGardenLight());
                    garden.setGardenWater(newGarden.getGardenWater());
                    garden.setGardenSoil(newGarden.getGardenSoil());
                    return gardenRepository.save(garden);  // Save the updated garden and return it.
                }
            }
            newGarden.setUser(user);  // Ensure the new garden is associated with the user
            return gardenRepository.save(newGarden);
        }
    }

    //Delete a user garden
    public void deleteGarden(Integer userId, Integer gardenId) {

        Optional<User> userOptional = userRepository.findById(userId);

        if (!userOptional.isPresent()) {
            throw new EntityNotFoundException("User with ID" + userId + "not found.");
        }

        Optional<Garden> gardenOptional = gardenRepository.findById(gardenId);

        if (!gardenOptional.isPresent() || !gardenOptional.get().getUser().getUserId().equals(userId)) {
            throw new EntityNotFoundException("Garden with ID " + gardenId + " not found for User with ID " + userId);
        }
        gardenRepository.deleteById(gardenId);
    }
}
