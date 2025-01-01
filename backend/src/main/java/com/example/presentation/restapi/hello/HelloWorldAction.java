package com.example.presentation.restapi.hello;

import java.net.http.HttpRequest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import nablarch.core.repository.di.config.externalize.annotation.SystemRepositoryComponent;
import nablarch.fw.ExecutionContext;

@Path("/helloWorld")
@SystemRepositoryComponent
public class HelloWorldAction {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public HelloWorldResponse get(HttpRequest request, ExecutionContext context){
        return new HelloWorldResponse("Hello World!!");
    }

    public static class HelloWorldResponse {
        public String text;
        public HelloWorldResponse(String text){
            this.text = text;
        }
    }
}
