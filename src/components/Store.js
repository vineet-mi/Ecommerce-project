import React, { useEffect,useState } from 'react'
import StoreProduct from './StoreProduct';

const Store = () => {
const [products, setProducts] = useState([]); // Initialize an empty array to store products

useEffect(() => {
  const fetchWorkouts = async () => {
    const response = await fetch("/api/products", {
    //   headers: {
    //     Authorization: `Bearer ${user.token}`,
    //   },
    });
      const json = await response.json();
      setProducts(json)

    // if (response.ok) {
    //   dispatch({ type: "SET_WORKOUTS", payload: json });
    // }
  };
//   if (user) {
    fetchWorkouts();
//   }
}, []);

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto ">
          <div className="flex flex-wrap -m-4 ">
            {products &&
              products.map((product) => (
                <div key={product._id} className="lg:w-1/4 md:w-1/3 p-4 w-full">
                  <StoreProduct product={product} />
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Store