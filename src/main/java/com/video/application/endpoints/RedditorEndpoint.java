package com.video.application.endpoints;

import com.video.application.entity.Redditor;
import com.video.application.service.RedditorService;
import dev.hilla.Endpoint;
import jakarta.annotation.security.PermitAll;

import java.util.List;

@Endpoint
@PermitAll
public class RedditorEndpoint {

    private final RedditorService redditorService;

    public RedditorEndpoint(RedditorService redditorService) {
        this.redditorService = redditorService;
    }

    @PermitAll
    public List<Redditor> retrieveRedditors() {
        System.out.println(redditorService.retrieveRedditors().get(0).getAvatarurl());
        return redditorService.retrieveRedditors();
    }
}
