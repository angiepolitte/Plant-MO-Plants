package com.launchcode.dama_devs.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/nurseries")
public class NurseryController {

    @Value("${google.api.key}")
    private String apiKey;

    private final WebClient webClient;

    public NurseryController(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://maps.googleapis.com/maps/api/place/textsearch/json").build();
    }

    @GetMapping("/local")
    public Mono<String> getPlaces(@RequestParam String query, @RequestParam(defaultValue = "8046.72") double radius) { // Within a 5 mile radius converted to meters(5x1609.344)~ meters is the standard unit for most services  {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("query", query)
                        .queryParam("radius", radius)
                        .queryParam("key", apiKey)
                        .build())
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class);
    }
}
