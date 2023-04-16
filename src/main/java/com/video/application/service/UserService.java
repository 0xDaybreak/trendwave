package com.video.application.service;

import com.video.application.entity.SecurityUser;
import com.video.application.entity.User;
import com.video.application.exceptions.UserNameAlreadyExistsException;
import com.video.application.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (userRepository != null) {
            User u = userRepository.findByUsername(username).orElseThrow(()-> new UsernameNotFoundException("username not found"));
            return new SecurityUser(u);
        }
        return null;
    }

    public User findById(String id) {
        if (userRepository != null) {
            return userRepository.findById(id).orElseThrow(()-> new UsernameNotFoundException("user id not found"));
        }
        return null;
    }
    
    public void createUser(User user) {
        assert userRepository != null;
        userRepository.findByUsername(user.getUsername())
                .ifPresent(u -> {
                    throw new UserNameAlreadyExistsException("username already exists");
                });
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }
}
