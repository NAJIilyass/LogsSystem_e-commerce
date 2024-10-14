import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const Product = (props) => {
    const { id, productName, price, productImage } = props.data;
    const { addToCart, cartItems } = useContext(ShopContext);

    const cartItemCount = cartItems[id];

    const handleProductClick = (id) => {
        console.log(`Product ${id} is clicked`);
    };

    const handleProductHover = (id) => {
        console.log(`Product ${id} is hovered`);
    };

    return (
        <div
            className="product"
            onClick={() => handleProductClick(id)}
            onMouseEnter={() => handleProductHover(id)}
        >
            <img src={productImage} />
            <div className="description">
                <p>
                    <b>{productName}</b>
                </p>
                <p> ${price}</p>
            </div>
            <button className="addToCartBttn" onClick={() => addToCart(id)}>
                Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
            </button>
        </div>
    );
};
