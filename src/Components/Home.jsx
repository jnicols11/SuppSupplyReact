import React from "react";
import '../scss/home.scss';

class Home extends React.Component {

    handleShopNow = () => {
        this.props.navigate('/products');
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h2>Welcome to SuppSupply</h2>
                    <p>Making the world go round, one pill at a time.</p>
                    <button onClick={this.handleShopNow}>Shop Now</button>
                </div>
            </div>
        )
    }
}

export default Home;