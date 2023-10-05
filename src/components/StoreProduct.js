import React from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StoreProduct = ({ product }) => {
  const { addCart } = useCart(); // Use the useCart hook
   const Navigate = useNavigate(); 
  const handleProduct = (productId) => {
    Navigate(`/products/${productId}`);
  };



    const handleAddToCart = async (productId) => {
      try {
        await addCart(productId, 1);
         toast.success("Product added to cart successfully!", {
           position: "top-center",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "light",
         }); // You can adjust the quantity and totalAmount as needed
      } catch (error) {
        console.error("An error occurred while adding to the cart:", error);
      }
    };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        alt={product.name}
        className="w-full h-64 object-cover object-center"
        src={product.imageURL}
      />
      <div className="px-6 py-4">
        <div className="mb-2 text-gray-500 text-xs uppercase font-semibold">
          {product.category}
        </div>
        <h2 className="text-gray-900 text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-700 text-sm">{product.description}</p>
      </div>
      <div className="px-6 py-4 justify-between items-center">
        <span className="text-gray-900 font-semibold">Rs.{product.price}</span>
        <div className="flex mt-2">
          <button
            onClick={() => handleProduct(product._id)}
            className="text-blue-500 hover:underline"
          >
            View Product
          </button>
          <button
            onClick={() => handleAddToCart(product._id)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full ml-2"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreProduct;
