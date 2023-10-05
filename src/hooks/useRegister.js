import { useState } from 'react'
import { useAuthContext } from "./useAuthContext";


const useRegister = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
      const { dispatch } = useAuthContext();

    const register = async (name, email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Specify JSON content type
          },
          body: JSON.stringify({ name, email, password }), // Pass user data in the request body
        });
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error)
        }
      if (response.ok) {
           localStorage.setItem("user", JSON.stringify(json));

           //update the authcontext
           dispatch({ type: "LOGIN", payload: json });
           
            setIsLoading(false);
        }
    }
    return { register, isLoading ,error};
}

export default useRegister
