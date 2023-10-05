import React, { useState } from 'react'
import { useAuthContext } from "./useAuthContext";


const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
      const { dispatch } = useAuthContext();

    

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const json = await response.json();
        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok) {
            localStorage.setItem("user", JSON.stringify(json));

            //update the authcontext
            dispatch({ type: "LOGIN", payload: json });
            setIsLoading(false);
        }
    }
  return {login, isLoading, error}
}

export default useLogin