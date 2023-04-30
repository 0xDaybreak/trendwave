package com.video.application.endpoints;


import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.video.application.entity.Category;
import com.video.application.service.CategoryService;
import dev.hilla.Endpoint;

import java.util.List;

@Endpoint
@AnonymousAllowed
public class CategoryEndpoint {

    private final CategoryService categoryService;

    public CategoryEndpoint(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @AnonymousAllowed
    public List<Category> accessCategories() {
        return categoryService.retrieveCategories();
    }


}
