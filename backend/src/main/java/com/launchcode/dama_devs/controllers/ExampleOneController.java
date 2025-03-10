package com.launchcode.dama_devs.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ExampleOneController {

    @GetMapping("/example-one")
    public String exampleOne() {
        return "This is the test that returns a message if it's connected. Hooray!";
    }
}

// these examples are written for each member to use as a routing/mapping resource when writing their controller codes to be accessed from React
// they can be deleted when the project is complete
