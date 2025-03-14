package com.launchcode.dama_devs.models.data;

import com.launchcode.dama_devs.models.Plant;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlantRepository extends CrudRepository<Plant, Integer> {
}
