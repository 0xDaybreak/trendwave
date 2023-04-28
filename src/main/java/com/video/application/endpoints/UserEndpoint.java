package com.video.application.endpoints;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.video.application.entity.User;
import com.video.application.service.UserService;
import dev.hilla.Endpoint;
import jakarta.annotation.security.PermitAll;

@Endpoint
@AnonymousAllowed
public class UserEndpoint {

    private final UserService userService;

    public UserEndpoint(UserService userService) {
        this.userService = userService;
    }

    public void saveUser(User user) {
        userService.createUser(user);
    }
    @AnonymousAllowed
    public boolean isLoggedIn() {
        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();
        return !auth.getName().equals("anonymousUser");
    }

    @PermitAll
    public void saveFavourite(String vid) {
        User user = userService.findByUsername();
        System.out.println(user.getUsername());
        user.getFavourites().add(vid);
        System.out.println(user.getFavourites());
        userService.updateUser(user);
    }
    @PermitAll
    public void deleteFavourites(String vid) {
        User user = userService.findByUsername();
        user.getFavourites().remove(vid);
        userService.updateUser(user);
    }
}
