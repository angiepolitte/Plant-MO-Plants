package com.launchcode.dama_devs.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter @Setter
@Entity
public class PlantRating extends AbstractEntity{

    private int plantRating;

    //rating-user relationship
    @NotNull(message = "A user is required")
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    //rating-plant relationship
    @NotNull(message = "A plant is required")
    @ManyToOne
    @JoinColumn(name = "plant_id")
    private Plant plant;

    //constructor
    public PlantRating(int plantRating, User user, Plant plant) {
        this.plantRating = plantRating;
        this.user = user;
        this.plant = plant;
    }

    //toString
    @Override
    public String toString() {
        return "PlantRating{" +
                "plantRating=" + plantRating +
                ", user=" + user +
                ", plant=" + plant +
                '}';
    }
}
