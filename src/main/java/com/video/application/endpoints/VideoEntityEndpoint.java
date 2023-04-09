package com.video.application.endpoints;


import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.video.application.entity.VideoEntity;
import com.video.application.exceptions.VideoEntityNotFoundException;
import com.video.application.repository.VideoEntityRepository;
import dev.hilla.Endpoint;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

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

    public List<VideoEntity> findTodaysTop() {
        LocalDate currentDate = LocalDate.now();
        String currentDay = String.valueOf(currentDate.getDayOfMonth());
        return repository.findAll().stream()
                .filter(videoEntity -> {
                    LocalDate videoDate = LocalDate.parse(videoEntity.getDate());
                    String videoDay = String.valueOf(videoDate.getDayOfMonth());
                    return currentDay.equals(videoDay);
                })
                .sorted(Comparator.comparing(VideoEntity::getLikes).reversed())
                .limit(12)
                .collect(Collectors.toList());
    }
}
