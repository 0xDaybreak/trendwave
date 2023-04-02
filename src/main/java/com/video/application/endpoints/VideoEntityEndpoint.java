package com.video.application.endpoints;


import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.video.application.entity.VideoEntity;
import com.video.application.exceptions.VideoEntityNotFoundException;
import com.video.application.repository.VideoEntityRepository;
import dev.hilla.Endpoint;

import java.math.BigInteger;
import java.util.List;

@Endpoint
@AnonymousAllowed
public class VideoEntityEndpoint {
    private final VideoEntityRepository repository;

    public VideoEntityEndpoint(VideoEntityRepository repository){
        System.out.println(repository);
        this.repository = repository;
    }

    public List<VideoEntity> findAll() {
        return repository.findAll();
    }

    public void updateLike(String id, BigInteger like) {
        VideoEntity videoEntity = repository.findById(id).orElseThrow(() -> new VideoEntityNotFoundException(id));
        videoEntity.setLikes(like);
        repository.save(videoEntity);
    }

    public VideoEntity findVideoEntityById(String id) {
        return repository.findById(id).orElseThrow(() -> new VideoEntityNotFoundException(id));
    }

}
