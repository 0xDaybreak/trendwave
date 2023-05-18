package com.video.application.repository;

import com.mongodb.lang.NonNull;
import com.video.application.entity.Redditor;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RedditorRepository extends MongoRepository<Redditor, String> {

    @NonNull
    @Override
    List<Redditor> findAll();
}
