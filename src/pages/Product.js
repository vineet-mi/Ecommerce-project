import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import CategoryGrid from "../components/CategoryPage";
import useCart from "../hooks/useCart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  // Import the useCart hook

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addCart, isLoading: cartIsLoading, error: cartError } = useCart(); // Use the useCart hook

  const handleAddToCart = async () => {
    try {
      // console.log(id);
      // You can customize this function to add the product to the cart and use the addToCart function
      // For example, you can use the addToCart function to add the product to the cart.
      await addCart(item._id, 1, item.price);
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

  useEffect(() => {
    // Simulate a 2-second delay before fetching data
    const delay = setTimeout(() => {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/products/${id}`);

          if (response.ok) {
            const json = await response.json();
            setItem(json);
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

      // Call the fetchProduct function when the component mounts
      fetchProduct();

      clearTimeout(delay); // Clear the delay timeout
    }, 2000); // 2-second delay

    return () => clearTimeout(delay); // Cleanup the timeout on unmount
  }, [id]);

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
            {isLoading ? (
              <div className="w-full h-96 bg-gray-300 animate-pulse"></div>
            ) : (
              <img
                className="object-cover object-center w-full h-96"
                src={item.imageURL}
                alt={item.name}
              />
            )}
          </div>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            {isLoading ? (
              <>
                <div className="text-xs title-font text-gray-500 tracking-widest mb-1">
                  Category
                </div>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-2">
                  Product Name
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <div className="w-4 h-4 bg-gray-300 rounded-full mr-2"></div>
                    <div className="w-4 h-4 bg-gray-300 rounded-full mr-2"></div>
                    <div className="w-4 h-4 bg-gray-300 rounded-full mr-2"></div>
                    <div className="w-4 h-4 bg-gray-300 rounded-full mr-2"></div>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2">
                    <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                    <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                    <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                  </span>
                </div>
                <p className="leading-relaxed mb-6">Product Description</p>
                <div className="flex items-center">
                  <div className="title-font font-medium text-2xl text-gray-900">
                    $Price
                  </div>
                  <button className="ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                    Add to Cart
                  </button>
                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xs title-font text-gray-500 tracking-widest">
                  {item.category}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {item.name}
                </h1>
                
                <p className="leading-relaxed">{item.description}</p>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ${item.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(item._id)}
                    className="ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    Add to Cart
                  </button>
                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                            stroke="#000000"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      {isLoading ? (
        <div className="container px-2 py-24 mx-auto">
          Suggested Products
          <div className="flex flex-wrap p-5">
            <div className="animate-pulse md:w-1/4 rounded overflow-hidden shadow-lg">
              <div className="h-full border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <div className="h-48 md:h-36 w-full bg-gray-300"></div>
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1 w-2/3 bg-gray-300 h-4"></h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3 w-4/5 bg-gray-300 h-6"></h1>
                  <p className="leading-relaxed mb-3 w-4/5 bg-gray-300 h-4"></p>
                  <div className="flex items-center flex-wrap">
                    <div className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 bg-gray-300 w-24 h-8"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="animate-pulse md:w-1/4 rounded overflow-hidden shadow-lg">
              <div className="h-full border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <div className="h-48 md:h-36 w-full bg-gray-300"></div>
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1 w-2/3 bg-gray-300 h-4"></h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3 w-4/5 bg-gray-300 h-6"></h1>
                  <p className="leading-relaxed mb-3 w-4/5 bg-gray-300 h-4"></p>
                  <div className="flex items-center flex-wrap">
                    <div className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 bg-gray-300 w-24 h-8"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="animate-pulse md:w-1/4 rounded overflow-hidden shadow-lg">
              <div className="h-full border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <div className="h-48 md:h-36 w-full bg-gray-300"></div>
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1 w-2/3 bg-gray-300 h-4"></h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3 w-4/5 bg-gray-300 h-6"></h1>
                  <p className="leading-relaxed mb-3 w-4/5 bg-gray-300 h-4"></p>
                  <div className="flex items-center flex-wrap">
                    <div className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 bg-gray-300 w-24 h-8"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="animate-pulse md:w-1/4 rounded overflow-hidden shadow-lg">
              <div className="h-full border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <div className="h-48 md:h-36 w-full bg-gray-300"></div>
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1 w-2/3 bg-gray-300 h-4"></h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3 w-4/5 bg-gray-300 h-6"></h1>
                  <p className="leading-relaxed mb-3 w-4/5 bg-gray-300 h-4"></p>
                  <div className="flex items-center flex-wrap">
                    <div className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 bg-gray-300 w-24 h-8"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CategoryGrid fetchItem={item} />
      )}
    </div>
  );
};

export default Product;
