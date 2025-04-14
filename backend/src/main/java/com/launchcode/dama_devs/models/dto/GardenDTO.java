package com.launchcode.dama_devs.models.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class GardenDTO {
//    private int id;
    private String gardenLight;
    private String gardenName;
    private String gardenSoil;
    private String gardenWater;
    private String gardenZone;
}