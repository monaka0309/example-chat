package com.example.presentation.restapi.todo;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.core.MediaType;

import com.example.infrastructure.persistence.entity.TodoEntity;
import com.example.presentation.restapi.todo.TodosAction.TodoResponse;

import nablarch.common.dao.UniversalDao;
import nablarch.fw.web.post.PostRequest;

public class TodosAction {
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public TodoResponse post(PostRequest requestBody) {
        TodoEntity entity = UniversalDao.findBySqlFile(TodoEntity.class, "FIND_MAX_TODO_ID", new Object[0]);
        Long newTodoId = entity.getTodoId() + 1;

        TodoEntity todoEntity = new TodoEntity();
        todoEntity.setTodoId(newTodoId);
        todoEntity.setText(requestBody.text);
        UniversalDao.insert(todoEntity);

        return new TodoResponse(newTodoId, requestBody.text);
    }

    public static class PostRequest {
        public String text;
    }
}
