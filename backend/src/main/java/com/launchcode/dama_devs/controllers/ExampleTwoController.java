package com.launchcode.dama_devs.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ExampleTwoController {

    @GetMapping("/example-two")
    public String exampleTwo() {
        return "This is the example two return message";
    }
}

// these examples are written for each member to use as a routing/mapping resource when writing their controller codes to be accessed from React
// they can be deleted when the project is complete
