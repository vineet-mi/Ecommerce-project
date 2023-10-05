import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

const useCart = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();
  // const navigate = useNavigate();

  const addCart = async (productId, quantity) => {
    const userId = user.user._id;
    console.log(userId, productId, quantity);
    setIsLoading(true);
    setError(null);
    const response = await fetch("http://localhost:4000/api/carts/addToCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${user.token}`, // Include the user's token in the 'Authorization' header
      },
      body: JSON.stringify({ productId, quantity, userId }),
    });

    if (response.ok) {
      // If the API call is successful, navigate to the Cart page
      console.log("pushed");
    } else {
      const json = await response.json();
      setError(json.error);
    }

    setIsLoading(false);
  };

 

  return { addCart, isLoading, error };
};

export default useCart;
