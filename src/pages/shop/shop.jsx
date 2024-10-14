import React from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css";

export const Shop = () => {
    const handleProductClick = (id) => {
        console.log(`Product ${id} is clicked`);
    };

    const handleProductHover = (id) => {
        console.log(`Product ${id} is hovered`);
    };

    return (
        <div className="shop">
            <div className="shopTitle">
                <h1>Riha Yess Shop</h1>
            </div>

            <div className="products">
                {PRODUCTS.map((product) => (
                    <Product key={product.id} data={product} />
                ))}
            </div>
        </div>
    );
};
