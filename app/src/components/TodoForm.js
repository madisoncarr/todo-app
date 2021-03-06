import {Form, Input} from "reactstrap";
import React from "react";

const TodoForm = props => {
    return (
        <Form onSubmit={props.handleSubmit}>
            <Input
                name="title"
                type="text"
                value={props.todo.title}
                onChange={props.handleChange}
            />
            <Input
                name="deadline"
                type="date"
                value={props.todo.deadline}
                onChange={props.handleChange}
            />
            <Input
                name="importance"
                type="number"
                min="1"
                max="5"
                value={props.todo.importance}
                onChange={props.handleChange}
            />
            <button type="submit">Add Todo</button>
        </Form>
);
};

export default TodoForm;