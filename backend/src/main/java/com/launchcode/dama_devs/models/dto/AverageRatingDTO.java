package com.launchcode.dama_devs.models.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NotNull
@NoArgsConstructor
@Setter @Getter
public class AverageRatingDTO {

    private int averageRating;
    private int plantId;

}
