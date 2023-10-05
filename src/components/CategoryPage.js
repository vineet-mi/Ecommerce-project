import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryGrid = (fetchItem) => {
  const [Category, setCategory] = useState(null);
  const Navigate = useNavigate();

  const handleProduct = (productId) => {
    Navigate(`/products/${productId}`);
  };
    
    // console.log(fetchItem.fetchItem.category);
  useEffect(() => {
    const fetchWorkouts = async () => {
      // Define the category you want to filter by
        const categoryToFetch = fetchItem.fetchItem.category; // Change this to your desired category

      // Fetch products with the specified category
      const response = await fetch(
        `/api/products/category?category=${categoryToFetch}`,
        {
          // Add any other headers or options as needed
        }
      );

      if (response.ok) {
        const json = await response.json();
        setCategory(json);
        console.log(json);
      }
    };

    // Call the fetchWorkouts function when the component mounts
    fetchWorkouts();
  }, []);

  return (
    <>
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">
            Explore More
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Category &&
              Category.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 cursor-pointer"
                >
                  <img
                    src={product.imageURL}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 font-medium">
                        $ {product.price}
                      </span>
                      <button
                        onClick={() => handleProduct(product._id)}
                        className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition duration-300"
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryGrid;
