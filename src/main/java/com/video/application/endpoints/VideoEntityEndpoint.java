package com.video.application.endpoints;


import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.video.application.entity.User;
import com.video.application.entity.VideoEntity;
import com.video.application.exceptions.VideoEntityNotFoundException;
import com.video.application.repository.VideoEntityRepository;
import com.video.application.service.UserService;
import dev.hilla.Endpoint;
import jakarta.annotation.security.PermitAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Endpoint
@AnonymousAllowed
public class VideoEntityEndpoint {

    @Autowired
    private final MongoTemplate mongoTemplate;
    private final VideoEntityRepository videoEntityRepository;
    private final UserService userService;
    public VideoEntityEndpoint(VideoEntityRepository repository, MongoTemplate mongoTemplate, UserService userService){
        this.userService = userService;
        this.videoEntityRepository = repository;
        this.mongoTemplate = mongoTemplate;
    }

    public List<VideoEntity> findAll() {
        return videoEntityRepository.findAll();
    }

    public void updateLike(String id, BigInteger like) {
        VideoEntity videoEntity = videoEntityRepository.findById(id).orElseThrow(() -> new VideoEntityNotFoundException(id));
        videoEntity.setLikes(like);
        videoEntityRepository.save(videoEntity);
    }

    public VideoEntity findVideoEntityById(String id) {
        return videoEntityRepository.findById(id).orElseThrow(() -> new VideoEntityNotFoundException(id));
    }

    @PermitAll
    public List<VideoEntity> findTodaysTop() {
        LocalDate currentDate = LocalDate.now();
        String currentDay = String.valueOf(currentDate.getDayOfMonth());
        return videoEntityRepository.findAll().stream()
                .filter(videoEntity -> {
                    LocalDate videoDate = LocalDate.parse(videoEntity.getDate());
                    String videoDay = String.valueOf(videoDate.getDayOfMonth());
                    return currentDay.equals(videoDay);
                })
                .sorted(Comparator.comparing(VideoEntity::getLikes).reversed())
                .limit(12)
                .collect(Collectors.toList());
    }

    @PermitAll
    public Set<VideoEntity> getFavourites() {
        User u = userService.findByUsername();
        if (u != null) {
            return videoEntityRepository.findAll()
                    .stream()
                    .filter(videoEntity -> u.getFavourites().contains(videoEntity.getId()))
                    .collect(Collectors.toSet());
        }
        return Collections.emptySet();
    }


    public List<VideoEntity> findTwelve(int page) {
        int pageSize = 12;
        Pageable pageable = PageRequest.of(page, pageSize);
        return videoEntityRepository.findAll(pageable).getContent();
    }
}
