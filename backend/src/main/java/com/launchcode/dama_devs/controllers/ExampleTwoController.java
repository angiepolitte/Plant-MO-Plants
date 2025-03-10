package com.launchcode.dama_devs.controllers;


import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api")
public class ExampleTwoController {

    @GetMapping("/example-two")
    public String exampleOne() {
        return "And this returns a message if it's connected, too! Yippee!";
    }
}

// these examples are written for each member to use as a routing/mapping resource when writing their controller codes to be accessed from React
// they can be deleted when the project is complete

