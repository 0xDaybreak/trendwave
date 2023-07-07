package com.video.application.endpoints;

import com.video.application.util.ResetMessage;
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
    public String retrieveUserId() {
        return userService.findByUsername().getId();
    }

    @AnonymousAllowed
    public boolean isUsernameExist(String username) {
        return userService.findByUsername(username).isPresent();
    }

    @PermitAll
    public void saveFavourite(String vid) {
        User user = userService.findByUsername();
        user.getFavourites().add(vid);
        userService.updateUser(user);
    }
    @PermitAll
    public void deleteFavourites(String vid) {
        User user = userService.findByUsername();
        user.getFavourites().remove(vid);
        userService.updateUser(user);
    }

    @AnonymousAllowed
    public ResetMessage sendRecoveryEmail(String username) throws Exception {
        return userService.sendRecoveryEmail(username);
    }
}
