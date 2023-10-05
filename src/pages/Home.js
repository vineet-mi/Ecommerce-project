import React from 'react'
import Banner from '../components/Banner';

// import ProductsGrid from '../components/ProductsGrid'
import FashionGrid from '../components/FashionGrid';
import ElectronicGrid from '../components/ElectronicGrid';

const Home = () => {
  return (
    <div>
      <Banner />
      <FashionGrid />
      <ElectronicGrid />
    </div>
  );
}

export default Home