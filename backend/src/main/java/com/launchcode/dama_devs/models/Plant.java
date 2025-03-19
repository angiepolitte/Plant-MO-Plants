package com.launchcode.dama_devs.models;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Plant extends AbstractEntity {

    //declared fields with getters. Did not use setters bc plant data is immutable.
    @Getter
    @NotNull
    private String commonName;

    @Getter
    @NotNull
    private String scientificName;

    @Getter
    @NotNull
    private String plantZone;

    @Getter
    @NotNull
    private String plantCycle;

    @Getter
    @NotNull
    private String plantType;

    @Getter
    @NotNull
    private String plantLight;

    @Getter
    @NotNull
    private String plantWater;

    @Getter
    @NotNull
    private String plantSoil;

    @Getter
    @NotNull
    private String plantDescription;

    @Getter
    @NotNull
    private String plantHeight;

    @Getter
    @NotNull
    private String plantSpread;

    @Getter
    @NotNull
    private String colorOfInterest;

    @Getter
    @NotNull
    private String seasonOfInterest;

    @Getter
    @NotNull
    private Boolean attractsBirds;

   @Getter
   @NotNull
   private Boolean attractsButterflies;

   @Getter
   @NotNull
   private Boolean attractsPollinators;

   @Getter
   @NotNull
   private Boolean isEdible;

   @Getter
   @NotNull
   private Boolean resistsDeer;

   @Getter
   @NotNull
   private Boolean toxicToAnimals;

    //plant-garden relationship
    @Getter
    @ManyToMany(mappedBy = "plants")
    private final List<Garden> gardens = new ArrayList<>();

    //plant-comment relationship
    @Getter
    @OneToMany(mappedBy = "plant")
    private final List<Comment> comments = new ArrayList<>();

//constructor
    public Plant(String commonName, String scientificName, String plantZone, String plantCycle, String plantType, String plantLight, String plantWater, String plantSoil, String plantDescription, String plantHeight, String plantSpread, String colorOfInterest, String seasonOfInterest, Boolean attractsBirds, Boolean attractsButterflies, Boolean attractsPollinators, Boolean isEdible, Boolean resistsDeer, Boolean toxicToAnimals) {
        this.commonName = commonName;
        this.scientificName = scientificName;
        this.plantZone = plantZone;
        this.plantCycle = plantCycle;
        this.plantType = plantType;
        this.plantLight = plantLight;
        this.plantWater = plantWater;
        this.plantSoil = plantSoil;
        this.plantDescription = plantDescription;
        this.plantHeight = plantHeight;
        this.plantSpread = plantSpread;
        this.colorOfInterest = colorOfInterest;
        this.seasonOfInterest = seasonOfInterest;
        this.attractsBirds = attractsBirds;
        this.attractsButterflies = attractsButterflies;
        this.attractsPollinators = attractsPollinators;
        this.isEdible = isEdible;
        this.resistsDeer = resistsDeer;
        this.toxicToAnimals = toxicToAnimals;
    }

    //empty constructor
    public Plant() {
    }

    //toString
    @Override
    public String toString() {
        return "Plant{" +
                "commonName='" + commonName + '\'' +
                ", scientificName='" + scientificName + '\'' +
                ", plantZone='" + plantZone + '\'' +
                ", plantCycle='" + plantCycle + '\'' +
                ", plantType='" + plantType + '\'' +
                ", plantLight='" + plantLight + '\'' +
                ", plantWater='" + plantWater + '\'' +
                ", plantSoil='" + plantSoil + '\'' +
                ", plantDescription='" + plantDescription + '\'' +
                ", plantHeight='" + plantHeight + '\'' +
                ", plantSpread='" + plantSpread + '\'' +
                ", colorOfInterest='" + colorOfInterest + '\'' +
                ", seasonOfInterest='" + seasonOfInterest + '\'' +
                ", attractsBirds=" + attractsBirds +
                ", attractsButterflies=" + attractsButterflies +
                ", attractsPollinators=" + attractsPollinators +
                ", isEdible=" + isEdible +
                ", resistsDeer=" + resistsDeer +
                ", toxicToAnimals=" + toxicToAnimals +
                ", gardens=" + gardens +
                ", comments=" + comments +
                '}';
    }
}
