package com.launchcode.dama_devs.controllers;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    // key is stored in environment variables for security
        @Value("${weather.api.key}")
    private String apiKey;

//HTTP client
    private final WebClient webClient;

    // WebClient is need to make the HTTP requests with the URL
    public WeatherController(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.openweathermap.org/data/2.5/").build();
    }
    // makes the actual API calls to get the data with all the correct headers necessary for open weather
    private Mono<String> fetchWeatherData(String endpoint, String queryParam, String value) {
        try {
            return webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path(endpoint)
                            .queryParam(queryParam, value)
                            .queryParam("appid", apiKey)
                            .queryParam("units", "imperial")
                            .build())
                    .accept(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .bodyToMono(String.class);
        } catch (Exception e) {
            e.printStackTrace();  // Log the error
            return Mono.error(new RuntimeException("Error calling weather API", e));
            //catches and logs any error during th API call and returns a failed MONO
        }
    }

    // gets the forecast by zip code
    @GetMapping("/forecast/zip")
    public Mono<String> getForecastByZip(@RequestParam String zip) {
        return fetchWeatherData("forecast", "zip", zip + ",US");
    }

    // current weather for widget, in React, its default is set to Saint Louis until we have the user enter zip code
    //weather widget not being used at this time, not necessary and blocks certain images/descriptions
    @GetMapping("/current")
    public Mono<String> getCurrentWeather(@RequestParam String city) {
        return fetchWeatherData("/weather", "q", city);
    }
    // gets forecast by city name, again, this will be changed to automatically default to user's zip code/city once entered

    @GetMapping("/forecast")
    public Mono<String> getForecast(@RequestParam String city) {
        return fetchWeatherData("forecast", "q", city);
    }



}
