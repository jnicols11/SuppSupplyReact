import axios from "axios";
import React from "react";
import '../scss/register.scss';

class Register extends React.Component {

    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    }

    updateFirstname = (e) => {
        this.setState({ firstName: e.target.value });
    }

    updateLastname = (e) => {
        this.setState({ lastName: e.target.value });
    }

    updateEmail = (e) => {
        this.setState({ email: e.target.value });
    }

    updatePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    handleRegister = (e) => {
        e.preventDefault();
        return this.register(this.state);
    }

    register = async (user) => {
        axios.post(`http://localhost:3000/user/register`, user)
        .then(result => {
            if (result.status === 200) {
                console.log("registration success");
                // TODO give user friendly message that registration succeeded
            } else {
                console.log("registration failed :(")
                // TODO give user friendly message that registration failed
            }
        })
    }

    render() {
        return (
            <div className="container">
                <h2>Register</h2>
                <div className="container__field">
                    <label htmlFor="firstName">First Name</label>
                    <br />
                    <input 
                        type="text" 
                        placeholder="First Name"
                        onChange={this.updateFirstname}
                    />
                </div>
                <div className="container__field">
                    <label htmlFor="lastName">Last Name</label>
                    <br />
                    <input 
                        type="text" 
                        placeholder="Last Name"
                        onChange={this.updateLastname}
                    />
                </div>
                <div className="container__field">
                    <label htmlFor="email">Email</label>
                    <br />
                    <input 
                        type="email" 
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
                <button onClick={this.handleRegister}>Register</button>
            </div>
        )
    }
}

export default Register;