package com.launchcode.dama_devs.models.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PhotoDTO {
    private String photoName;
    private Integer gardenId;
    private Integer userId;
}