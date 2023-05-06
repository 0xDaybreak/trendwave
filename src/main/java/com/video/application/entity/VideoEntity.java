package com.video.application.entity;

import com.vaadin.flow.component.template.Id;

import java.time.LocalDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigInteger;
import java.util.ArrayList;

@Document
public class VideoEntity {
    @Id
    private String id;
    private String url;

    private String audio;
    private BigInteger likes;

    private LocalDate date;
    private String post;

    public String getSubreddit() {
        return subreddit;
    }

    public void setSubreddit(String subreddit) {
        this.subreddit = subreddit;
    }

    private String subreddit;
    public String getPost() {
        return post;
    }

    public void setPost(String post) {
        this.post = post;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public BigInteger getLikes() {
        return likes;
    }

    public void setLikes(BigInteger likes) {
        this.likes = likes;
    }

    private ArrayList<String> tags;

    public ArrayList<String> getTags() {
        return tags;
    }

    public void setTags(ArrayList<String> tags) {
        this.tags = tags;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getAudio() {
        return audio;
    }

    public void setAudio(String audio) {
        this.audio = audio;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        VideoEntity that = (VideoEntity) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (url != null ? !url.equals(that.url) : that.url != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (url != null ? url.hashCode() : 0);
        return result;
    }
}
