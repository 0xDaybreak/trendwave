package com.video.application.repository;

import com.video.application.entity.PasswordResetToken;
import com.video.application.entity.Redditor;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PasswordResetTokenRepository extends MongoRepository<PasswordResetToken, String> {

    @Override
    Optional<PasswordResetToken> findById(String s);
}
