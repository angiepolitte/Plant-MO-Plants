package com.launchcode.dama_devs.models.data;

import com.launchcode.dama_devs.models.Role;
import com.launchcode.dama_devs.models.User;
import com.launchcode.dama_devs.models.dto.UserDTO;

import java.util.List;
import java.util.Optional;

public interface UserService {
    void updateUserRole(Integer userId, String roleName);

    List<User> getAllUsers();

    UserDTO getUserById(Integer id);

    User findByUsername(String username);

    Optional<User> findByEmail(String email);

    User registerUser(User user);

    void updateAccountLockStatus(Integer userId, boolean lock);

    List<Role> getAllRoles();

    void updateAccountExpiryStatus(Integer userId, boolean expire);

    void updateAccountEnabledStatus(Integer userId, boolean enabled);

    void updateCredentialsExpiryStatus(Integer userId, boolean expire);

    void updatePassword(Integer userId, String password);
}