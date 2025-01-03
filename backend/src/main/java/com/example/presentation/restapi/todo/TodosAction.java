package com.example.presentation.restapi.todo;

import com.example.infrastructure.persistence.entity.TodoEntity;
import nablarch.common.dao.EntityList;
import nablarch.common.dao.UniversalDao;
import nablarch.core.repository.di.config.externalize.annotation.SystemRepositoryComponent;
import nablarch.core.validation.ee.ValidatorUtil;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.constraints.NotBlank;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

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

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public TodoResponse post(PostRequest requestBody){
        ValidatorUtil.validate(requestBody);

        TodoEntity entity = UniversalDao.findBySqlFile(TodoEntity.class, "FIND_MAX_TODO_ID", new Object[0]);
        Long newTodoId = entity.getTodoId() + 1;

        TodoEntity todoEntity = new TodoEntity();
        todoEntity.setTodoId(newTodoId);
        todoEntity.setText(requestBody.text);
        UniversalDao.insert(todoEntity);

        return new TodoResponse(newTodoId, requestBody.text);
    }



    public static class TodoResponse {
        public final Long id;
        public final String text;
        public TodoResponse(Long id, String text){
            this.id = id;
            this.text = text;
        }
    }
    public static class PostRequest {
        @NotBlank
        public String text;
    }
}
