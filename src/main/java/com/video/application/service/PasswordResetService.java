package com.video.application.service;

import com.video.application.entity.PasswordResetToken;
import com.video.application.entity.User;
import com.video.application.repository.PasswordResetTokenRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PasswordResetService {
    private final PasswordResetTokenRepository passwordResetTokenRepository;

    public PasswordResetService(PasswordResetTokenRepository passwordResetTokenRepository) {
        this.passwordResetTokenRepository = passwordResetTokenRepository;
    }

    public String createPasswordResetTokenForUser(User user, String token) {
        PasswordResetToken resetToken = new PasswordResetToken(token, user);
        passwordResetTokenRepository.save(resetToken);
        return resetToken.getId();
    }

    public String returnToken(String id) throws Exception {
        Optional<String> res = Optional.ofNullable(passwordResetTokenRepository.findById(id).get().getToken());
        if(res.isEmpty()) {
            throw new Exception("Id not found");
        }
        return res.get();
    }

}
