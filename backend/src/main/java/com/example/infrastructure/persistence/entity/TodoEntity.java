package com.example.infrastructure.persistence.entity;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "todo")
@Access(AccessType.FIELD)
public class TodoEntity {
    
    @Id
    private Long todoId;
    private String text;
    public Long getTodoId(){
        return todoId;
    }
    public void setTodoId(Long todoId){
        this.todoId = todoId;
    }
    public String getText(){
        return text;
    }
    public void setText(String text){
        this.text = text;
    }
}
