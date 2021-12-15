import axios from "axios";
import React from "react";
import '../scss/account.scss'

class Account extends React.Component {

    state = {
        id: +localStorage.getItem('userID'),
        firstName: "",
        lastName: "",
        email: ""
    }

    componentDidMount() {
        this.getUserInfo(this.state.id);
    }

    getUserInfo = async (userID) => {
        axios.get(`http://localhost:3000/user/` + userID)
            .then(result => {
                this.setState({
                    firstName: result.data.firstName,
                    lastName: result.data.lastName,
                    email: result.data.email
                })
            }).catch(error => {
                console.log(error);
            })
    }

    updateFirstName = (e) => {
        this.setState({
            firstName: e.target.value
        });
    }

    updateLastName = (e) => {
        this.setState({
            lastName: e.target.value
        });
    }

    updateEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    handleUpdate = (e) => {
        e.preventDefault();
        return this.updateUser(this.state);
    }

    updateUser = async (user) => {
        axios.put(`http://localhost:3000/user/update`, user)
            .then(result => {
                console.log(result);
                if (result.status === 200) {
                    // User updated successfully!
                    console.log("Update Success");
                } else {
                    console.log("Update failed, please try again later.")
                }
            }).catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="account">
                <h2>Account</h2>
                <div className="account__info">
                    <div className="account__field">
                        <label htmlFor="firstName">First Name</label>
                        <br />
                        <input type="text" value={this.state.firstName} onChange={this.updateFirstName} />
                    </div>
                    <div className="account__field">
                        <label htmlFor="lastName">Last Name</label>
                        <br />
                        <input type="text" value={this.state.lastName} onChange={this.updateLastName} />
                    </div>
                    <div className="account__field">
                        <label htmlFor="email">Email</label>
                        <br />
                        <input type="email" value={this.state.email} onChange={this.updateEmail} />
                    </div>
                </div>
                <button onClick={this.handleUpdate}>Update Info</button>
            </div>
        )
    }
}

export default Account;