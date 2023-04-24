package com.video.application.service;

import com.vaadin.flow.server.VaadinRequest;
import com.video.application.entity.SecurityUser;
import com.video.application.entity.User;
import com.video.application.exceptions.UserNameAlreadyExistsException;
import com.video.application.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

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
            //List<SimpleGrantedAuthority> authorities = Arrays.asList(new SimpleGrantedAuthority("user"));
            //u.setAuthorities(authorities);
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

    public User findByUsername() {
        if(userRepository != null) {
            return userRepository.findByUsername(VaadinRequest.getCurrent().getUserPrincipal().getName()).orElseThrow(()->new UsernameNotFoundException("username not found"));

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
        user.setFavourites(new HashSet<>());
        userRepository.save(user);
    }

    public void updateUser(User user) {
        userRepository.save(user);
    }
}
