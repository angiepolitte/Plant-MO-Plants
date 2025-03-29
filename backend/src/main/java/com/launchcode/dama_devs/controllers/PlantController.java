package com.launchcode.dama_devs.controllers;

import com.launchcode.dama_devs.models.data.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/plant")
public class PlantController {

    @Autowired
    private PlantRepository plantRepository;
}