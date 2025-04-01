package com.launchcode.dama_devs.models.data;


import com.launchcode.dama_devs.models.Photo;
import com.launchcode.dama_devs.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {
    List<Photo> findByGardenIdAndUser_UserId(Integer gardenId, Long userId);
    List<Photo> findAll(); // Fetch all photos for testing
}
