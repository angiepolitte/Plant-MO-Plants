package com.launchcode.dama_devs.services;

import com.launchcode.dama_devs.models.data.GardenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class GardenService {

    //Creates an instance of the variable
    private final GardenRepository gardenRepository;

    @Autowired
    public GardenService (GardenRepository gardenRepository) {
        this.gardenRepository = gardenRepository;
    }

    //Get all user's gardens in main dashboard
    public List<Garden> getAllGardens() {
        return gardenRepository.findAll();
    }

    //Get a specific user garden (display in garden detail page)
    public Optional<Garden> getGardenById(Integer id) {
        return gardenRepository.findById(id);
    }

    //Checks to see if a garden exists. If it does not, creates a new garden. If it does, updates the existing garden.
    public Garden saveGarden(Garden garden) {
        return gardenRepository.save(garden);
    }

    //Delete a user garden
    public void deleteGarden(Integer id) {
        gardenRepository.deleteById(id);
    }
}