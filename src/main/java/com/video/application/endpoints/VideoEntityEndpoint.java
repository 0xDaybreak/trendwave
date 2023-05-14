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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    @PermitAll
    public void updateLike(String id, BigInteger like, String userId) {
        VideoEntity videoEntity = videoEntityRepository.findById(id).orElseThrow(() -> new VideoEntityNotFoundException(id));
        videoEntity.setLikes(like);
        videoEntity.getUserLikes().add(userId);
        videoEntityRepository.save(videoEntity);
    }

    public VideoEntity findVideoEntityById(String id) {
        return videoEntityRepository.findById(id).orElseThrow(() -> new VideoEntityNotFoundException(id));
    }

    @PermitAll
    public List<VideoEntity> findTodaysTop(int page, int pageSize)  {
        LocalDate currentDate = LocalDate.now();
        Pageable pageable = PageRequest.of(page, pageSize);
        return videoEntityRepository.findAll(pageable).getContent().stream()
                .filter(videoEntity -> {
                    LocalDate videoDate = videoEntity.getDate();
                    return currentDate.equals(videoDate);
                })
                .sorted(Comparator.comparing(VideoEntity::getLikes).reversed())
                .limit(8)
                .collect(Collectors.toList());
    }

    @PermitAll
    public Set<VideoEntity> getFavourites(int page, int pageSize) {
        User u = userService.findByUsername();
        Pageable pageable = PageRequest.of(page, pageSize);
        if (u != null) {
            return videoEntityRepository.findAll(pageable).getContent()
                    .stream()
                    .filter(videoEntity -> u.getFavourites().contains(videoEntity.getId()))
                    .collect(Collectors.toSet());
        }
        return Collections.emptySet();
    }

    @PermitAll
    public boolean isVideoFavourite(String id) {
        User u = userService.findByUsername();
        if(u != null) {
            return u.getFavourites().contains(id);
        }
        return false;
    }

    @AnonymousAllowed
    public List<VideoEntity> filterEntities(String filter, int page, int pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);
        Page<VideoEntity> pageResult;
        if (filter == null || filter.isBlank() || filter.equals("undefined")) {
            pageResult = videoEntityRepository.findAll(pageable);
        } else {
            pageResult = videoEntityRepository.findBySubreddit(filter, pageable);
        }
        return pageResult.getContent();
    }


    @AnonymousAllowed
    public boolean isNew(String id) {
        LocalDate currentDate = LocalDate.now();
        LocalDate videoDate = videoEntityRepository.findById(id).get().getDate();
        return currentDate.equals(videoDate);
    }
}
