import axios from "axios";
import React from "react";
import '../scss/login.scss';

class Login extends React.Component {

    state = {
        email: "",
        password: ""
    }

    updateEmail = (e) => {
        this.setState({ email: e.target.value });
    }

    updatePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    handleLogin = (e) => {
        e.preventDefault();
        return this.login(this.state);
    }

    login = async (credentials) => {
        axios.post(`http://localhost:3000/user/login`, credentials)
        .then(result => {
            if (result.status === 200) {
                localStorage.setItem('userID', +result.data.ID);
                localStorage.setItem('isAuth', true);
                this.props.navigate('/');
            }
        }).catch(error => {
            console.log(error);
            if (error.status !== 500) {
                console.log("invalid credentials");
            } else {
                console.log("Login failed, please try again later.")
            } 
        })
    }

    render() {
        return (
            <div className="container">
                <h2>Login</h2>
                <div className="container__field">
                    <label htmlFor="email">Email</label>
                    <br />
                    <input 
                        type="text" 
                        placeholder="Email" 
                        onChange={this.updateEmail}
                    />
                </div>
                <div className="container__field">
                    <label htmlFor="password">Password</label>
                    <br />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        onChange={this.updatePassword}
                    />
                </div>
                <button onClick={this.handleLogin}>Login</button>
            </div>
        )
    }
}

export default Login;