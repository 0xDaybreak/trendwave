package com.video.application.config;

import com.vaadin.flow.spring.security.VaadinWebSecurity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jose.jws.JwsAlgorithms;


import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@EnableWebSecurity
@Configuration
public class Security extends VaadinWebSecurity {

    @Value("${my.app.auth.secret}")
    private String authSecret;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        super.configure(http);

        // Disable creating and using sessions in Spring Security
        http.sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // Register your login view to the view access checker mechanism
        setLoginView(http, "/login");

        // Enable stateless authentication
        setStatelessAuthentication(http,
                new SecretKeySpec(Base64.getDecoder().decode(authSecret),
                        JwsAlgorithms.HS256),
                "com.video.application"
        );
    }

}
