package com.video.application.exceptions;

public class VideoEntityNotFoundException extends RuntimeException {

    public VideoEntityNotFoundException(String id) {
        super("Video entity not found with id " + id);
    }

}
