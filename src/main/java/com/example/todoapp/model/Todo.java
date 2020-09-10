package com.example.todoapp.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.hibernate.validator.constraints.Range;

import javax.persistence.*;

import java.time.LocalDate;

@Data
@Entity
@Builder
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
public class Todo {
    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String title;
    private LocalDate deadline;
    @Range(min = 1, max = 5)
    private Integer importance;
    private boolean status = false;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user_id")
    private User user;
}
