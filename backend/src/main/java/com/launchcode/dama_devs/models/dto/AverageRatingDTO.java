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

    @Override
    public String toString() {
        return "AverageRatingDTO{" +
                "averageRating=" + averageRating +
                ", plantId=" + plantId +
                '}';
    }
}
