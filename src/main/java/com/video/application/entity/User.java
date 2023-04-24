package com.video.application.entity;

import com.mongodb.lang.NonNull;
import com.vaadin.flow.component.template.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Set;

@Document
public class User {
    @Id
    private String id;
    @Indexed(unique = true)
    @NonNull
    private String username;
    @NonNull
    private String password;
    private Set<String> favourites;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @NonNull
    public String getUsername() {
        return username;
    }

    public void setUsername(@NonNull String username) {
        this.username = username;
    }

    @NonNull
    public String getPassword() {
        return password;
    }

    public void setPassword(@NonNull String password) {
        this.password = password;
    }

    public Set<String> getFavourites() {
        return favourites;
    }

    public void setFavourites(Set<String> favourites) {
        this.favourites = favourites;
    }
}
