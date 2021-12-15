import React from "react";
import '../scss/card.scss';

class Card extends React.Component {

    handleButtonClick = (event => {
        this.props.onClick(this.props.productID);
    });

    render() {
        return (
            <div className="card" onClick={this.handleButtonClick}>
                <img src={this.props.productImage} alt={this.props.productName}></img>
                <h4>{this.props.productName}</h4>
                <p><span>$</span>{this.props.productPrice}</p>
            </div>
        )
    }
}

export default Card;