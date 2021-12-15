import React from "react";
import axios from "axios";
import '../scss/cart.scss';

class Cart extends React.Component {

    state = {
        cartID: -1,
        products: [],
        userID: +localStorage.getItem('userID'),
        subtotal: 0
    }

    componentDidMount() {
        this.populateCart(this.state.userID);
    }

    populateCart = (userID) => {
        axios.get(`http://localhost:3000/cart/user/` + userID)
        .then(result => {
            this.setState({ cartID: result.data.ID });
            this.getCartProducts(this.state.cartID);
        }).catch(error => {
            console.log(error);
        })
    }

    getCartProducts = (cartID) => {
        console.log(this.state.products)
        axios.get(`http://localhost:3000/cart/products/` + cartID)
        .then(result => {
            let subtotal = 0;
            this.setState({ products: result.data });
            this.state.products.forEach((product) => {
                subtotal += product.price;
            })
            this.setState({ subtotal: subtotal });
        }).catch(error => {
            console.log(error);
        })
    }

    handleRemoveProduct = (productID) => {
        let obj = { cartID: this.state.cartID, productID: productID }
        this.removeItemFromCart(obj);
    }

    removeItemFromCart = (obj) => {
        axios.post(`http://localhost:3000/cart/remove`, obj)
        .then(result => {
            if (result.status === 200) {
                // delete product successful, remove product from state products
                let products = [];
                for (let i = 0; i < this.state.products.length; i++) {
                    if (this.state.products[i].ID !== obj.productID) {
                        products.push(this.state.products[i]);
                    }
                }

                let subtotal = 0;
                products.forEach((product) => {
                    subtotal += product.price;
                });

                this.setState({ products: products, subtotal: subtotal });
            }
        }).catch(error => {
            console.log(error);
        })
    }

    handleCheckout = () => {
        this.props.navigate('/checkout');
    }

    render() {
        return (
            <div className="cart">
                <h2>Cart</h2>
                <div className="cart__products">
                    {this.state.products.map(product => 
                        <div className="cart__products__item">
                            <img src={product.image} alt={product.name} />
                            <h4>{product.name}</h4>
                            <p className="cart__products__item__desc">{product.description}</p>
                            <p><span>$</span>{product.price}</p>
                            <button onClick={() => this.handleRemoveProduct(product.ID)}>Remove</button>
                        </div>
                    )}
                </div>
                <div className="cart__checkout">
                    <div className="cart__checkout__field">
                        <label htmlFor="subtotal">Subtotal: </label>
                        <p><span>$</span>{this.state.subtotal.toFixed(2)}</p>
                    </div>
                    <div className="cart__checkout__field">
                        <label htmlFor="tax">Tax: </label>
                        <p><span>$</span>{(this.state.subtotal * .087).toFixed(2)}</p>
                    </div>
                    <div className="cart__checkout__field">
                        <label htmlFor="total">Grand Total: </label>
                        <p><span>$</span>{(this.state.subtotal + (this.state.subtotal * .087)).toFixed(2)}</p>
                    </div>
                    <button onClick={this.handleCheckout}>Checkout</button>
                </div>
            </div>
        )
    }
}

export default Cart;