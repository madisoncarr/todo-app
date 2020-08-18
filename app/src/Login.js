import React, {Component} from 'react';
import AuthenticationService from './AuthenticationService'

class Login extends Component {
    constructor(props) {
        super(props);
         this.state = {
            username: "user",
             password: "password",
             hasLoginFailed: false,
             showSuccessMessage: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name] : event.target.value
            }
        )
    }

    handleSubmit = e => {
        e.preventDefault();
        // console.log("got here");
        // const email = e.target.value;
        // const json = await axios.post("/doLogin", {"username": email});
        // const user = json.data;
        // console.log(user);
        // if(this.state.username === 'user' && this.state.password === 'password') {
        //     this.props.history.push('/todos');
        //     // this.setState({showSuccessMessage: true})
        //     // this.setState({hasLoginFailed : false})
        // } else {
        //     this.setState({showSuccessMessage : false})
        //     this.setState({hasLoginFailed: true})
        // }
        AuthenticationService
            .executeJwtAuthenticateService(this.state.username, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
                this.props.history.push('/todos');
            }).catch(() => {
                this.setState({ showSuccessMessage: false, hasLoginFailed: true });
            })
    };

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.handleSubmit}>Login</button>
                </div>
            </div>

        )
    }
}

export default Login;