package com.launchcode.dama_devs.models.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@NotNull
@Getter @Setter
public class PlantRatingDTO {
    private int plantId;
    private Integer userId;
    private int plantRating;

    @Override
    public String toString() {
        return "PlantRatingDTO{" +
                "plantId=" + plantId +
                ", userId=" + userId +
                ", plantRating=" + plantRating +
                '}';
    }
}
