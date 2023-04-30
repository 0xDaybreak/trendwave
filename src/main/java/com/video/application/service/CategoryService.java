package com.video.application.service;

import com.video.application.entity.Category;
import com.video.application.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> retrieveCategories() {
        return categoryRepository.findAll();
    }
}
