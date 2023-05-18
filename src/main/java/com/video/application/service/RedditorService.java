package com.video.application.service;

import com.video.application.entity.Redditor;
import com.video.application.repository.RedditorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RedditorService {

    private final RedditorRepository redditorRepository;

    public RedditorService(RedditorRepository redditorRepository) {
        this.redditorRepository = redditorRepository;
    }

    public List<Redditor> retrieveRedditors() {
        return redditorRepository.findAll();
    }
}
