package com.video.application.repository;

import com.video.application.entity.VideoEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.math.BigInteger;
import java.util.List;

@Repository
public interface VideoEntityRepository extends MongoRepository<VideoEntity, String> {

    List<VideoEntity> findAll();

    @Query("{'id': ?0}")
    void updateLike(String id, BigInteger like);

    VideoEntity findVideoEntityById(String id);

    Page<VideoEntity> findBySubreddit(String subreddit, Pageable pageable);


}
