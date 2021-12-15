import React from "react";
import '../scss/navbar.scss';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {

    state = { inputtext: "" };

    handleChangeInput = (event) => {
        this.setState({ inputtext: event.target.value });
    }

    handleSearch = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.inputtext);
    }

    handleLogout = () => {
        localStorage.setItem('userID', -1);
        localStorage.setItem('isAuth', false);
        this.props.navigate('/');
    }

    render() {
        let links;
        if (localStorage.getItem('isAuth') === "true") {
            // User is logged in set links for log in
            links = [
                <Link className="navbar__links__link" to="/products">Products</Link>,
                <Link className="navbar__links__link" to="/account">Account</Link>,
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a className="navbar__links__link" href="#" onClick={this.handleLogout}>Logout</a>,
                <Link className="navbar__links__link" to="/cart">Cart</Link>
            ]
        } else {
            console.log('User is not logged in');
            links = [
                <Link className="navbar__links__link" to="/products">Products</Link>,
                <Link className="navbar__links__link" to="/register">Register</Link>,
                <Link className="navbar__links__link" to="/login">Login</Link>,
                <Link className="navbar__links__link" to="/login">Cart</Link>
            ]
        }

        return (
            <div className="navbar">
                <Link className="title" to="/">
                    <h2>Welcome to SuppSupply</h2>
                </Link>
                <div className="navbar__search">
                    <input 
                        type="text" 
                        placeholder="Search" 
                        onChange={this.handleChangeInput}
                    />
                    <button onClick={this.handleSearch}>
                        Search
                    </button>
                </div>
                <div className="navbar__links">
                    {links}
                </div>
            </div>
        )
    }
}

export default Navbar;