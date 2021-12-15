import React from "react";
import '../scss/products.scss';
import Card from "./Card";

class Products extends React.Component {

    handleSelectProduct = (productID) => {
        this.props.onClick(productID);
    }

    render() {
        const products = this.props.productList.map(
            (product) => {
                return (
                    <Card 
                        productID = {product.ID}
                        key = {product.ID}
                        productName = {product.name}
                        productDescription = {product.description}
                        productPrice = {product.price}
                        productQuantity = {product.quantity}
                        productImage = {product.image}
                        onClick = {this.handleSelectProduct}
                    />
                )
            }
        )

        return (
            <div className="products">
                <h2>Products</h2>
                <div className="products__grid">
                    {products}
                </div>
            </div>
        )
    }
}

export default Products;