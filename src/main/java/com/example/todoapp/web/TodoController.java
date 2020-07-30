package com.example.todoapp.web;

import com.example.todoapp.model.Todo;
import com.example.todoapp.model.TodoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
//@RequestMapping("/todos")
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
public class TodoController {

    private TodoRepository todoRepository;

    public TodoController(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @GetMapping("/todos")
    ResponseEntity<Collection<Todo>> getAllTodos() {
        log.info("*************IN TODOS CONTROLLER**************");
        Collection<Todo> todos = todoRepository.findAll();
        return ResponseEntity.ok(todos);
    }
}
