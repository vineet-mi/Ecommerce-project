import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
// import { getOrders } from "../api/orderApi"; // Import your API function to fetch orders

const Order = () => {
    const { user } = useAuthContext();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cart, setCart] = useState([])
    const userId = user.user._id;

    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const url = `http://localhost:4000/api/orders/${userId}`;
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const json = await response.json();
            setCart(json);
            if (Array.isArray(json)) {
              const flattenedData = json.reduce(
                (acc, order) => [...acc, ...order.products],
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

              setOrders(cartItemsWithDetails);
            }
          } else {
            console.error("Failed to fetch product details");
          }
        } catch (error) {
          console.error(
            "An error occurred while fetching product details:",
            error
          );
        } finally {
          setIsLoading(false); // Set loading to false when data is fetched or on error
        }
      };
      fetchProduct();
    }, [userId]);
    console.log(cart);
    return (
      <>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : orders.length === 0 ? (
            <p>You have no orders.</p>
          ) : (
            <div className="grid gap-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border p-4 rounded-lg shadow-md"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    Order #{order.orderNumber}
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {order.products.map((product) => (
                      <div key={product._id} className="border p-2">
                        <p className="text-lg font-semibold">{product.name}</p>
                        <p>Quantity: {product.quantity}</p>
                        <p>Price: ${product.price}</p>
                        {/* <p>Total: ${order.product.quantity * order.product.price}</p> */}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <p className="text-lg font-semibold">
                      Total Amount: ${order.totalAmount}
                    </p>
                    <p>
                      Order Date:{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {cart &&
            cart.map((item) => (
              <div className="mt-4" key={item._id}>
                <p className="text-lg font-semibold">
                  Total Amount: ${item.totalAmount}
                </p>
                <p>
                  Order Date: {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
        </div>
      </>
    );
};

export default Order;
