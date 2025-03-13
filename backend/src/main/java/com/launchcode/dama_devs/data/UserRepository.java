package com.launchcode.dama_devs.data;

import com.launchcode.dama_devs.models.User;
import org.springframework.data.repository.CrudRepository;
//import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    User findByUsername(String username);
}
