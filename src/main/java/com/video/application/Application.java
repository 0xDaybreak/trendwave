package com.video.application;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.theme.Theme;
import com.video.application.endpoints.VideoEntityEndpoint;
import com.video.application.entity.VideoEntity;
import com.video.application.repository.VideoEntityRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;

/**
 * The entry point of the Spring Boot application.
 *
 * Use the @PWA annotation make the application installable on phones, tablets
 * and some desktop browsers.
 *
 */
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@Theme(value = "my-app")
public class Application implements AppShellConfigurator {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    /*
    @Bean
    CommandLineRunner runner(VideoEntityRepository repository) {
        return  args-> {
            VideoEntity video = new VideoEntity();
            video.setUrl("www.test.com");
            repository.insert(video);
        };
    }

     */

}