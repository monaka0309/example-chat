package com.example.controller;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
public class TodosController {

    @GetMapping
    public List<TodoResponse> get() {
        // 疎通の検証が目的のため、固定で返却する
        return List.of(
                new TodoResponse(1L, "やること１"),
                new TodoResponse(2L, "やること２"),
                new TodoResponse(3L, "やること３"));
    }

    @PostMapping
    public TodoResponse post(@RequestBody PostRequest requestBody) {
        // 疎通を検証が目的のため、入力値の検証はせず、IDは固定で返却する
        return new TodoResponse(4L, requestBody.text);
    }

    public static class PostRequest {

        public String text;
    }

    public static class TodoResponse {

        public final Long id;

        public final String text;

        public TodoResponse(Long id, String text) {
            this.id = id;
            this.text = text;
        }
    }
}