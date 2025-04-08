package com.launchcode.dama_devs.models.data;

import com.launchcode.dama_devs.models.PlantRating;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlantRatingRepository extends CrudRepository<PlantRating, Integer> {
    Optional<PlantRating> findByUser_userIdAndPlantId(Integer userId, Integer plantId);
}
