package com.example.todoapp.utils;

import com.example.todoapp.model.Todo;
import com.example.todoapp.model.User;

import java.io.Serializable;
import java.util.Set;

public class JwtTokenResponse implements Serializable {

    private static final long serialVersionUID = 8317676219297719109L;

    private final String token;

    private final ResponseUser user = new ResponseUser();

    public JwtTokenResponse(String token) {
        this.token = token;
    }

    public JwtTokenResponse(String token, User user) {
        this.token = token;
        this.user.id = user.getId();
        this.user.firstName = user.getFirstName();
        this.user.lastName = user.getLastName();
        this.user.email = user.getEmail();
        this.user.todos = user.getTodos();
    }

    public String getToken() {
        return this.token;
    }

    private class ResponseUser {
        private Long id;
        private String firstName;
        private String lastName;
        private String email;
        private Set<Todo> todos;
    }
}
