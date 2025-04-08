package com.launchcode.dama_devs.models.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class CommentDTO {

    private int id;
    private String commentContent;
    private int plantId;
    private Integer userId;

    // Getters and Setters
}
