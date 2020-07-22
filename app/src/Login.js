import React, {Component} from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
         this.state = {
            email: ""
        }
    }

    render() {
        console.log(`email value: ${this.state.email}`);
        return (
            <div>
                <h1>What is your email?</h1>
                <input placeholder={"email here"} value={this.state.email} onChange={(e) => this.setState({email:e.target.value})}/>
                <button>Enter</button>
            </div>

        )
    }
}

export default Login;