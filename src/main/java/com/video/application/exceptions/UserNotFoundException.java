package com.video.application.exceptions;

public class UserNotFoundException extends Throwable {
    public UserNotFoundException(String usernameNotFound) {
        super(usernameNotFound);
    }
}
