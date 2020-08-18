package com.example.todoapp.web;

import com.example.todoapp.model.Todo;
import com.example.todoapp.model.TodoRepository;
import com.example.todoapp.model.User;
import com.example.todoapp.model.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Collection;

@RestController
//@RequestMapping("/todos")
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
public class TodoController {

    private TodoRepository todoRepository;

    private UserRepository userRepository;

    public TodoController(TodoRepository todoRepository, UserRepository userRepository) {

        this.todoRepository = todoRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/todos")
    ResponseEntity<Collection<Todo>> getAllTodos(Principal principal) {
        log.info("*************PRINCIPLE NAME" + principal.getName());
        log.info("*************IN TODOS CONTROLLER**************");
        User userInfo = userRepository.findByEmail(principal.getName());
        Collection<Todo> todos = userInfo.getTodos();
        return ResponseEntity.ok(todos);
    }
}
