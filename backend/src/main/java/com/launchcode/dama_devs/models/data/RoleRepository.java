package com.launchcode.dama_devs.models.data;

import com.launchcode.dama_devs.models.AppRole;
import com.launchcode.dama_devs.models.Role;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RoleRepository extends CrudRepository<Role, Integer> {
    Optional<Role> findByRoleName(AppRole appRole);
}
