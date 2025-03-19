package com.launchcode.dama_devs.controllers;

import com.launchcode.dama_devs.models.User;
import com.launchcode.dama_devs.models.data.GardenRepository;
import com.launchcode.dama_devs.models.data.PlantRepository;
import com.launchcode.dama_devs.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class GardenController {

    @Autowired
    private GardenRepository gardenRepository;

    //used for garden-user relationship
    @Autowired
    private UserRepository userRepository;

    //used for garden-plant relationship
    @Autowired
    private PlantRepository plantRepository;
}
