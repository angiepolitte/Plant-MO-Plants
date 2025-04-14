package com.launchcode.dama_devs.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Photo extends AbstractEntity {

    @Column(name = "photo_name", nullable = false)
    private String photoName;

    @Lob
    @Column(name = "photo_image", nullable = false, columnDefinition = "LONGBLOB")
    private byte[] photoImage;

    @Column(name = "is_featured")
    private boolean isFeatured = false;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private User user;  // Keep this as a direct reference

    @OneToOne
    @JoinColumn(name = "garden_id", referencedColumnName = "id", nullable = false)
    private Garden garden;


}