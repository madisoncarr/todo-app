package com.example.todoapp;

import com.example.todoapp.model.Todo;
import com.example.todoapp.model.User;
import com.example.todoapp.model.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Collections;
import java.util.stream.Stream;

@Component
@Profile("seed")
public class Seed implements CommandLineRunner {

    private final UserRepository userRepository;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public Seed(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... strings) {
        Stream.of("madison.carr@utexas.edu", "matti@gmail.com").forEach(email -> userRepository.save(new User(email, "password")));

        User madi = userRepository.findByEmail("madison.carr@utexas.edu");
        madi.setFirstName("Madison");
        Todo madisTodo = Todo.builder().title("Take out dog").importance(1).deadline(LocalDate.of(2020, 11, 11)).build();

        madi.setTodos(Collections.singleton(madisTodo));
        userRepository.save(madi);

        User matti = userRepository.findByEmail("matti@gmail.com");
        matti.setFirstName("Matti");
        Todo mattisTodo = Todo.builder().title("Take out garbage").importance(1).deadline(LocalDate.of(2020, 9, 25)).build();
        matti.setTodos(Collections.singleton(mattisTodo));
        userRepository.save(matti);
    }

}
