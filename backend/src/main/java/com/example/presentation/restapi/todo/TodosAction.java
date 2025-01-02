package com.example.presentation.restapi.todo;

import java.util.List;
import java.util.stream.Collectors;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.example.infrastructure.persistence.entity.TodoEntity;

import nablarch.common.dao.EntityList;
import nablarch.common.dao.UniversalDao;
import nablarch.core.repository.di.config.externalize.annotation.SystemRepositoryComponent;

@SystemRepositoryComponent
@Path("/todos")
public class TodosAction {
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<TodoResponse> get(){
        EntityList<TodoEntity> todoEntities = UniversalDao.findAll(TodoEntity.class);
        return todoEntities.stream()
            .map(entity -> new TodoResponse(entity.getTodoId(), entity.getText()))
            .collect(Collectors.toList());
    }

    public static class TodoResponse {
        public final Long id;
        public final String text;
        public TodoResponse(Long id, String text){
            this.id = id;
            this.text = text;
        }
    }
}
