import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import emitEvent from "../../functions/Functions";

export const Product = (props) => {
    const { id, productName, price, productImage } = props.data;
    const { addToCart, cartItems } = useContext(ShopContext);
    const [content, setContent] = useState("");

    const writeFile = async (event) => {
        try {
        const response = await fetch("http://localhost:5000/log-event", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "event": event }),
        });

        if (response.ok) {
            console.log("Content written to file!");
        } else {
            console.log("Failed to write to file.");
        }
        } catch (error) {
        console.error("Error writing to file:", error);
        }
    };

    const cartItemCount = cartItems[id] || 0; // Ensure cartItemCount is defined

    const handleProductClick = (productId) => {
        // Define the event details
        const event = {
            id: productId,
            type: "Product Clicked", // Type of the event
            timestamp: new Date().toISOString(), // Current date and time in ISO format
            details: {
                message: "User clicked on a product",
                action: "click",
                userAgent: navigator.userAgent, // Information about the user's browser
            },
        };
    
        console.log(`Product ${productId} is clicked`);
        writeFile(event); // Pass the event object to the writeFile function
    };
    
    const handleProductHover = (productId) => {
        // Define the event details
        const event = {
            id: productId,
            type: "Product Hovered", // Type of the event
            timestamp: new Date().toISOString(), // Current date and time in ISO format
            details: {
                message: "User hovered over a product",
                action: "hover",
                userAgent: navigator.userAgent, // Information about the user's browser
            },
        };
    
        console.log(`Product ${productId} is hovered`);
        writeFile(event); // Pass the event object to the writeFile function
    };
    

    return (
        <div
            className="product"
            onClick={() => handleProductClick(id)}
            onMouseEnter={() => handleProductHover(id)}
        >
            <img src={productImage} alt={productName} />
            <div className="description">
                <p>
                    <b>{productName}</b>
                </p>
                <p>${price}</p>
            </div>
            <button
                className="addToCartBttn"
                onClick={() => addToCart(id)}
            >
                Add To Cart {cartItemCount > 0 && `(${cartItemCount})`}
            </button>
        </div>
    );
};
