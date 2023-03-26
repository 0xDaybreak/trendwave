package com.video.application.endpoints;


import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.video.application.entity.VideoEntity;
import com.video.application.repository.VideoEntityRepository;
import dev.hilla.Endpoint;
import org.springframework.beans.factory.annotation.Autowired;

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


}
