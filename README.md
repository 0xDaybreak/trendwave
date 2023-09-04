# Trend Wave project
This is an application similar to [scrolller.com](https://scrolller.com). The project uses the latest hilla version. Hilla is an open source framework that integrates a Spring Boot Java backend with a reactive TypeScript frontend. 
For more information about hilla and technologies used in this project check the "Useful links" section.

## Setting up the project

Clone the project and open it in our favourite IDE and wait for Maven to download all the dependencies. 

Set up MongoDB on the machine you would like to run the application on. In the file src/main/resources/application.properties make sure that the variable spring.data.mongodb.uri has the correct uri of your database.

## Running the application

The project is a standard Maven project. To run it from the command line,
type `mvnw` (Windows), or `./mvnw` (Mac & Linux), then open
http://localhost:8080 in your browser.

You can also import the project to your IDE of choice as you would with any
Maven project.

## Creating content for the website

In order to populate the website with content you can modify the python scripts to access the Reddit API with your credentials. After modifying the .py files, make sure that the MongoDB server is running and simply run the python scripts in order to populate the Database.

## Useful links

- Read the documentation at [hilla.dev/docs](https://hilla.dev/docs/).
- Ask questions on [Stack Overflow](https://stackoverflow.com/questions/tagged/hilla) or join our [Discord channel](https://discord.gg/MYFq5RTbBn).
- Report issues, create pull requests in [GitHub](https://github.com/vaadin/hilla).
