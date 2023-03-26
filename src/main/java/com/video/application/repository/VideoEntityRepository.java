package com.video.application.repository;

import com.video.application.entity.VideoEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoEntityRepository extends MongoRepository<VideoEntity, String> {

    List<VideoEntity> findAll();
}
