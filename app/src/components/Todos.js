import React, {Component} from "react";
import axios from "axios";
import {connect} from 'react-redux'

class Todos extends Component {

    render() {
        return (<div>
            <ul>
                {this.state.todos[0] && this.state.todos.map(todo => <li key={todo.id}>{todo.title}</li>)}
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