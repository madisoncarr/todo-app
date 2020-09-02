package com.example.todoapp.utils;

import com.example.todoapp.model.Todo;
import com.example.todoapp.model.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.Set;

public class JwtTokenResponse implements Serializable {

    private static final long serialVersionUID = 8317676219297719109L;

    private final String token;

    private final ResponseUser user;

    public JwtTokenResponse(String token) {
        this.token = token;
        this.user = null;
    }

    public JwtTokenResponse(String token, User user) {
        this.token = token;
        ResponseUser responseUser = new ResponseUser();
        responseUser.id = user.getId();
        responseUser.firstName = user.getFirstName();
        responseUser.lastName = user.getLastName();
        responseUser.email = user.getEmail();
        responseUser.todos = user.getTodos();

        this.user = responseUser;
    }

    public String getToken() {
        return this.token;
    }

    public ResponseUser getUser() {
        return this.user;
    }

    @Data
    private class ResponseUser {
        private Long id;
        private String firstName;
        private String lastName;
        private String email;
        private Set<Todo> todos;
    }
}
