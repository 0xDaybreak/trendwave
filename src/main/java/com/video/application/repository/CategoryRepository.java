package com.video.application.repository;

import com.mongodb.lang.NonNull;
import com.video.application.entity.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CategoryRepository extends MongoRepository<Category, String> {

    @NonNull
    @Override
    List<Category> findAll();
}
