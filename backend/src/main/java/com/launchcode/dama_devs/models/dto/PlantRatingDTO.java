package com.launchcode.dama_devs.models.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@NotNull
@Getter
@Setter
public class PlantRatingDTO {

    private int plantRating;
    private Integer userId;
    private int plantId;

}
