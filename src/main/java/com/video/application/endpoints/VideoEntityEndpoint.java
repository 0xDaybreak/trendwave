package com.video.application.endpoints;


import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.video.application.entity.VideoEntity;
import com.video.application.exceptions.VideoEntityNotFoundException;
import com.video.application.repository.VideoEntityRepository;
import dev.hilla.Endpoint;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Endpoint
@AnonymousAllowed
public class VideoEntityEndpoint {

    @Autowired
    private final MongoTemplate mongoTemplate;
    private final VideoEntityRepository repository;

    public VideoEntityEndpoint(VideoEntityRepository repository, MongoTemplate mongoTemplate){
        System.out.println(repository);
        this.repository = repository;
        this.mongoTemplate = mongoTemplate;
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

    @PermitAll
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

    public String test() {
        return "test";
    }
    public List<VideoEntity> findTwelve(int page) {
        int pageSize = 12;
        Pageable pageable = PageRequest.of(page, pageSize);
        return repository.findAll(pageable).getContent();
    }
}
