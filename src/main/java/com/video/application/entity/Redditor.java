package com.video.application.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@Document
public class Redditor {
    @Id
    private String id;

    private String avatarurl;

    private String redditUsername;
    private Set<String> topSubreddits;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAvatarurl() {
        return avatarurl;
    }

    public void setAvatarurl(String avatarurl) {
        this.avatarurl = avatarurl;
    }

    public String getRedditUsername() {
        return redditUsername;
    }

    public void setRedditUsername(String redditUsername) {
        this.redditUsername = redditUsername;
    }


    public Set<String> getTopSubreddits() {
        return topSubreddits;
    }

    public void setTopSubreddits(Set<String> topSubreddits) {
        this.topSubreddits = topSubreddits;
    }
}
