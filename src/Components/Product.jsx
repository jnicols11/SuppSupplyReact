import axios from "axios";
import React from "react";
import '../scss/product.scss';

class Product extends React.Component {

    handleAddToCart = () => {
        if (localStorage.getItem('isAuth') === "true") {
            // User is logged in
            let userID = +localStorage.getItem('userID');
            axios.get(`http://localhost:3000/cart/user/` + userID)
            .then(result => {
                let cartID = result.data.ID;
                let addObj = { cartID: cartID, productID: this.props.product.ID };
                this.addToCart(addObj);
            }).catch(error => {
                console.log(error);
            })
        } else {
            // User is not logged in
            this.props.navigate('/login');
        }
    }

    addToCart = (obj) => {
        axios.post(`http://localhost:3000/cart/add`, obj)
        .then(result => {
            if (result.data === 200) {
                this.props.navigate('/cart');
            } else {
                console.log("Item failed to be added to cart. Please try again later.");
            }
        }).catch(error => {
            console.log(error);
        })
    }

    render () {
        return (
            <div className="product">
                <h2>{this.props.product.name}</h2>
                <div className="product__content">
                    <div className="product__content__image">
                        <img src={this.props.product.image} alt={this.props.product.name} />
                    </div>
                    <div className="product__content__details">
                        <b><p>{this.props.product.description}</p></b>
                        <p>{this.props.product.quantity} Available!</p>
                        <p><span>$</span>{this.props.product.price}</p>
                        <button onClick={this.handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Product;