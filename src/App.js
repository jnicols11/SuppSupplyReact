/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import DataSource from './Data/DataSource';
import Cart from "./Components/Cart";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Products from "./Components/Products";
import Register from "./Components/Register";
import Product from "./Components/Product";
import Account from "./Components/Account";
import Checkout from "./Components/Checkout";

function App () {
    let navigate = useNavigate();
    let [productList, setProductList] = React.useState([]);
    let [searchPhrase, setSearchPhrase] = React.useState("");
    let [selectedProductID, setSelectedProductID] = React.useState(-1);

    useEffect(() => {
        loadProducts();
    }, [])


    async function updateSearchResults(phrase) {
        setSearchPhrase(phrase);
        const response = await DataSource.get('/product/search/name/' + phrase);
        setProductList(response.data);
        navigate('/products');
    }

    async function loadProducts() {
        const response = await DataSource.get('/products');
        setProductList(response.data)
    }

    function viewProduct(productID) {
        var indexnumber = 0;
        for (var i = 0; i < productList.length; i++) {
            if (productList[i].ID === productID) {
                indexnumber = i;
            }
        }
        
        setSelectedProductID(indexnumber);
        navigate('/view/' + indexnumber, {replace: true});
    }

    return (
            <div>
                <Navbar onSubmit={updateSearchResults} navigate={navigate} />
                <Routes>
                    <Route path="/" element = { <Home navigate={navigate} /> } />
                    <Route exact path="/products" element = { <Products productList={productList} onClick={viewProduct} /> } />
                    <Route exact path="/register" element = { <Register /> } />
                    <Route exact path="/login" element = { <Login navigate={navigate} /> } />
                    <Route exact path="/account" element = { <Account /> } />
                    <Route exact path="/cart" element = { <Cart navigate={navigate} /> } />
                    <Route exact path="/view/:productID" element = { <Product product={productList[selectedProductID]} navigate={navigate} /> } />
                    <Route exact path="/checkout" element = { <Checkout /> } />
                </Routes>
            </div>
    )
}

export default App;