package com.video.application.exceptions;

public class UserNameAlreadyExistsException extends RuntimeException {
    public UserNameAlreadyExistsException(String usernameAlreadyExists) {
        super(usernameAlreadyExists);
    }
}
