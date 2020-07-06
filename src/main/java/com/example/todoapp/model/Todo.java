package com.example.todoapp.model;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.hibernate.validator.constraints.Range;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import java.time.LocalDate;

@Data
@Entity
@Builder
@NoArgsConstructor
@RequiredArgsConstructor
public class Todo {
    @Id
    @GeneratedValue
    private Long id;
    @NotNull
    private String title;
    private LocalDate deadline;
    @Range(min = 1, max = 5)
    private Integer importance;
    private boolean status = false;
}
