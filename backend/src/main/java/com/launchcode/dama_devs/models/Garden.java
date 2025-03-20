package com.launchcode.dama_devs.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@Entity
public class Garden extends AbstractEntity {

    //Setters included so user can edit the garden values in the future via the dashboard.
    @Getter
    @Setter
    @NotNull
    private String gardenName;

    @Getter
    @Setter
    @NotNull
    private String gardenHardinessZone;

    @Getter
    @Setter
    @NotNull
    private String gardenLightLevel;

    @Getter
    @Setter
    @NotNull
    private String gardenMoistureLevel;
    it push -u origin garden-model
    @Getter
    @Setter
    @NotNull
    private String gardenSoilType;

    //garden-plant relationship
    @Getter
    @ManyToMany
    private final List<Plant> plants = new ArrayList<>();

    //garden-user relationship
    @Setter
    @Getter
    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    //constructors
    public Garden(User user, String gardenName, String gardenHardinessZone, String gardenLightLevel, String gardenMoistureLevel, String gardenSoilType) {
        this.user = user;
        this.gardenName = gardenName;
        this.gardenHardinessZone = gardenHardinessZone;
        this.gardenLightLevel = gardenLightLevel;
        this.gardenMoistureLevel = gardenMoistureLevel;
        this.gardenSoilType = gardenSoilType;
    }

    public Garden() {
    }

    @Override
    public String toString() {
        return "Garden{" +
                "gardenName='" + gardenName + '\'' +
                ", gardenHardinessZone='" + gardenHardinessZone + '\'' +
                ", gardenLightLevel='" + gardenLightLevel + '\'' +
                ", gardenMoistureLevel='" + gardenMoistureLevel + '\'' +
                ", gardenSoilType='" + gardenSoilType + '\'' +
                ", plants=" + plants +
                ", user=" + user +
                '}';
    }

    // Allows a plant to be added to plants list.
    public void addPlant(Plant plant){
        this.plants.add(plant);
    }

}
