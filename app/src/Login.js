import React, {Component} from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
         this.state = {
            email: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log("got here");
        const email = e.target.value;
        const json = await axios.post("/doLogin", {"email": email});
        const user = json.data;
        console.log(user);
    };

    render() {
        console.log(`email value: ${this.state.email}`);
        return (
            <div>
                <h1>What is your email?</h1>
                <input placeholder={"email here"} value={this.state.email} onChange={(e) => this.setState({email:e.target.value})}/>
                <button onClick={(e)=>this.handleSubmit(e)}>Enter</button>
            </div>

        )
    }
}

export default Login;