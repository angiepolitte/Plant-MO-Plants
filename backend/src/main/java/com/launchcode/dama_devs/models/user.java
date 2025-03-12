package com.launchcode.dama_devs.models;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotNull;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
public class user extends AbstractEntity{
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @NotNull
    private String username;

    @NotNull
    private String pwHash;

    public user(){}

    public user(String username, String password) {
        this.username = username;
        this.pwHash = encoder.encode(password);
    }

    public Boolean isMatchingPassword(String password){
        return encoder.matches(password,pwHash);
    }
}
