package com.launchcode.dama_devs.models.data;

import com.launchcode.dama_devs.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
}
