import React from "react";
import {Form, Input} from "reactstrap";

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
        </Form>
    );
};

export default TodoForm;