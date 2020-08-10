package com.example.todoapp.utils;

import java.io.Serializable;

public class JwtTokenUtil implements Serializable {

    static final String CLAIM_KEY_USERNAME = "sub";
    static final String CLAIM_KEY_CREATED = "iat";

}
