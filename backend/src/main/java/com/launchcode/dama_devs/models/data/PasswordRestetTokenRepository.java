package com.launchcode.dama_devs.models.data;

import com.launchcode.dama_devs.models.PasswordResetToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PasswordRestetTokenRepository extends CrudRepository<PasswordResetToken,Integer> {
    Optional<PasswordResetToken> findByToken(String token);
}
