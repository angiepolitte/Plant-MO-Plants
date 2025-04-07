package com.launchcode.dama_devs.models.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class CommentDTO {
    private String commentContent;
    private Integer userId;
    private Integer plantId;

    // Getters and Setters
}
