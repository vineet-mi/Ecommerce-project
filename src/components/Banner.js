import React from 'react'

const Banner = () => {
    return (
      <>
        <section className="bg-indigo-900 text-white">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:w-1/2 md:w-1/2 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 className="text-4xl sm:text-5xl mb-4 font-semibold">
                Discover the Latest Tech Gadgets
              </h1>
              <p className="text-lg mb-8">
                Stay ahead with our cutting-edge technology products.
              </p>
              <div className="flex justify-center">
                <button className="bg-white text-indigo-900 hover:bg-indigo-800 border-0 py-2 px-6 focus:outline-none rounded-full text-lg font-semibold">
                  Explore Products
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 md:w-1/2 w-5/6">
              <img
                className="object-cover object-center rounded-lg"
                alt="Tech Gadgets"
                src="https://images.unsplash.com/photo-1592503254549-d83d24a4dfab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWNvbW1lcmNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
              />
            </div>
          </div>
        </section>
      </>
    );
}

export default Banner