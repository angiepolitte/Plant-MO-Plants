package com.launchcode.dama_devs.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCredentialsRequestDTO {
    private String token;
    private String newUsername;
    private String newPassword;
}

