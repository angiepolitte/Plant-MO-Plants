package com.launchcode.dama_devs.services;

import com.launchcode.dama_devs.models.User;
import com.launchcode.dama_devs.models.data.GardenRepository;
import com.launchcode.dama_devs.models.data.UserRepository;
import com.launchcode.dama_devs.models.dto.GardenDTO;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
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
        return gardenRepository.findByUser_UserId(userId);
    }

    //Get a specific user garden (display in garden detail page)
    public Optional<Garden> getGardenById(Integer userId, Integer gardenId) {

        Iterable<Garden> gardens = gardenRepository.findByUser_UserId(userId);

        for (Garden garden : gardens) {
            if (garden.getId() == gardenId) {
                return Optional.of(garden);  // Return the garden wrapped in Optional
            }
        }
        return Optional.empty();
    }

    //Checks to see if a garden exists. If it does no, creates a new garden.
//    public Garden newGarden(Integer userId, Garden newGarden) {
//
//        Optional<User> userOptional = userRepository.findById(userId);
//
//        if (!userOptional.isPresent()) {
//            throw new EntityNotFoundException("User with ID" + userId + "not found.");
//        } else {
//            User user = userOptional.get(); // Get the user object
//            newGarden.setUser(user); // Ensure the new garden is associated with the user
//            }
//            return gardenRepository.save(newGarden);
//        }

    //STEP ONE WALKTHROUGH USING DTO... checks to see if a garden exists. If it does not, creates a new garden.
    public Garden saveGarden(Integer userId, GardenDTO dto) {

        Optional<User> userOptional = userRepository.findById(userId); //Look for user in User Repository.

        if (!userOptional.isPresent()) { //If the user is not present, throw this error.
            throw new EntityNotFoundException("User with ID" + userId + "not found.");
        }

        Garden garden = new Garden(); //If the user exists, create a new Garden object.
        garden.setUser(userOptional.get()); //Set the current user to the new garden.
        garden.setGardenName(dto.getGardenName()); //Set the garden name to the new garden.
        garden.setGardenZone(dto.getGardenZone());
        garden.setGardenLight(dto.getGardenLight());
        garden.setGardenWater(dto.getGardenWater());
        garden.setGardenSoil(dto.getGardenSoil());

        return gardenRepository.save(garden); //Save the newly-created garden to the repository.
    }

    public Garden updateGarden(Integer userId, Integer gardenId, GardenDTO dto) {

        Optional<Garden> optionalGarden = gardenRepository.findById(gardenId);

        if (!optionalGarden.isPresent()) {
            throw new EntityNotFoundException("Garden with ID " + gardenId + " not found.");
        }

        Garden garden = optionalGarden.get();

        if (!garden.getUser().getUserId().equals(userId)) {
            throw new SecurityException("User does not have permission to update this garden.");
        }

        garden.setGardenName(dto.getGardenName()); //Set the garden name to the new garden.
//        garden.setGardenZone(dto.getGardenZone());
//        garden.setGardenLight(dto.getGardenLight());
//        garden.setGardenWater(dto.getGardenWater());
//        garden.setGardenSoil(dto.getGardenSoil());

        return gardenRepository.save(garden); //Save the newly-created garden to the repository.
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

    //STEP TWO/THREE WALKTHROUGH USING DTO... adds Garden Zone to the repository record for the garden created in Step One.
//    public Garden newGardenStepsTwoAndThree(Integer gardenId, GardenDTO dto) {
//
//        Optional<Garden> gardenOptional = gardenRepository.findById(gardenId); //Look for garden in Garden Repository.
//
//        if (!gardenOptional.isPresent()) { //If the user is not present, throw this error.
//            throw new EntityNotFoundException("Garden with ID" + gardenId + "not found.");
//        }
//
//        Garden garden = gardenOptional.get(); //If the garden exists, gets the Garden object.
//
//        //Step Two: Update garden zone.
//        if (dto.getGardenZone() != null) {
//            garden.setGardenZone(dto.getGardenZone());
//        }
//
//        //Step Three: Update garden water, soil, and light.
//        if (dto.getGardenLight() != null) {
//            garden.setGardenLight(dto.getGardenLight());
//        }
//
//        if (dto.getGardenSoil() != null) {
//            garden.setGardenSoil(dto.getGardenSoil());
//        }
//
//        if (dto.getGardenWater() != null) {
//            garden.setGardenWater(dto.getGardenWater());
//        }
//        return gardenRepository.save(garden); //Save the newly-created garden to the repository.
//    }

    //Checks to see if a garden exists.  If it does, updates the existing garden.
//    public Garden updateGarden(Integer userId, Integer gardenId, Garden newGarden) {
//
//        Optional<User> userOptional = userRepository.findById(userId);
//
//        Iterable<Garden> gardens = gardenRepository.findByUser_UserId(userId);
//
//        if (!userOptional.isPresent()) {
//            throw new EntityNotFoundException("User with ID" + userId + "not found.");
//        } else {
//            User user = userOptional.get(); // Get the user object
//
//            for (Garden garden : gardens) { // Iterates through the all the gardens with the User id specified above.
//                if (garden.getId() == gardenId) { // If the garden already exists for this User, update details (lines 45-49).
//                    garden.setGardenName(newGarden.getGardenName());
//                    garden.setGardenZone(newGarden.getGardenZone());
//                    garden.setGardenLight(newGarden.getGardenLight());
//                    garden.setGardenWater(newGarden.getGardenWater());
//                    garden.setGardenSoil(newGarden.getGardenSoil());
//                    return gardenRepository.save(garden);  // Save the updated garden and return it.
//                }
//            }
//            newGarden.setUser(user);  // Ensure the new garden is associated with the user
//            return gardenRepository.save(newGarden);
//        }
//    }


