import React, {Component} from "react";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

class Todos extends Component {

    render() {
        return (<div>
            <Link to="/todos/add">
                <button>Add Todo</button>
            </Link>
            <ul>
                {this.props.todos[0] && this.props.todos.map(todo => <li key={todo.id}>{todo.title}</li>)}
            </ul>
        </div>)
    }
}

const mapStateToProps = state => {
    return {
        todos: state.todos
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//
//     }
// }

export default connect(mapStateToProps)(Todos);