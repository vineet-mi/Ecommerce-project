import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const CartItems = () => {
  const { user } = useAuthContext();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
    const userId = user.user._id;
    let totalAmount = 0;

  useEffect(() => {
    const getCart = async () => {
      try {
        const url = `http://localhost:4000/api/carts/${userId}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const flattenedData = data.reduce(
              (acc, cart) => [...acc, ...cart.products],
              []
            );

            const cartItemsWithDetails = await Promise.all(
              flattenedData.map(async (item) => {
                const productResponse = await fetch(
                  `api/products/${item.product}`
                );
                if (productResponse.ok) {
                  const productData = await productResponse.json();
                  return {
                    ...item,
                    product: productData,
                  };
                }
                return item;
              })
            );

            setCartItems(cartItemsWithDetails);
          }
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getCart();
  }, [user]);

  const calculateTotal = () => {
        
      if (cartItems.length > 0) {
          totalAmount = cartItems.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
          ); 
    }
    return totalAmount;
  };

  const handleDelete = async (item) => {
    const productId = item.product._id;
    // const userId = user.user._id;
    console.log(productId, userId);
    try {
      const url = `http://localhost:4000/api/carts/${userId}/products/${productId}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // Delete was successful
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle network or other errors
    }
  };
    const emptyCart = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/carts/emptyCart/${userId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${user.token}`, // Include the user's token in the 'Authorization' header
            },
          }
        );
      } catch (error) {
          console.log(error);
      }
    };
    const handleCheckOut = async () => {
      const response = await fetch(
        "http://localhost:4000/api/orders/addToOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${user.token}`, // Include the user's token in the 'Authorization' header
          },
          body: JSON.stringify({ userId, cartItems, totalAmount }),
        }
      );

      if (response.ok) {
        //   const json = await response.json();
        //   console.log(json);
          emptyCart();
          
      } else {
          const json = await response.json();
          console.error(json)
      }
        // console.log(cartItems);
    };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="flex">
        <div className="w-3/4 pr-8">
          {isLoading ? (
            <p>Loading...</p>
          ) : cartItems.length > 0 ? (
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="text-left">Product</th>
                  <th className="text-left">Quantity</th>
                  <th className="text-left">Price</th>
                  <th className="text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.product.price}</td>
                    <td>${item.product.price * item.quantity}</td>
                    <td>
                      <span onClick={() => handleDelete(item)}>delete</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        <div className="w-1/4">
          <div className="border p-4">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${calculateTotal()}</span>
            </div>
            <div className="flex justify-between">
              <span>Total:</span>
              <span>${calculateTotal()}</span>
            </div>
          </div>
          <button
            onClick={handleCheckOut}
            className="bg-indigo-500 text-white w-full py-2 mt-4"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;