package com.launchcode.dama_devs.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Repository;

@Repository
public interface userRepository extends CrudRepository<User , Integer> {
    User findByUsername(String username);
}
