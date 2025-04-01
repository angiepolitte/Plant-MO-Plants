package com.launchcode.dama_devs.models.data;

import com.launchcode.dama_devs.models.Garden;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GardenRepository extends CrudRepository<Garden, Integer> {
    List<Garden> findByUser_UserId(Integer userId);
}
//@Repository
//public interface GardenRepository extends CrudRepository<Garden, Integer> {
//    List<Garden> findByUserId(Integer userId);
//}
