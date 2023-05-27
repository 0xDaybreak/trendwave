package com.video.application.endpoints;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.video.application.entity.Redditor;
import com.video.application.service.RedditorService;
import dev.hilla.Endpoint;
import jakarta.annotation.security.PermitAll;

import java.util.List;

@Endpoint
@AnonymousAllowed
public class RedditorEndpoint {

    private final RedditorService redditorService;

    public RedditorEndpoint(RedditorService redditorService) {
        this.redditorService = redditorService;
    }

    @AnonymousAllowed
    public List<Redditor> retrieveRedditors() {
        return redditorService.retrieveRedditors();
    }
}
