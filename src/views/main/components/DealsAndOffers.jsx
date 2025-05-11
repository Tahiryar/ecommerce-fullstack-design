import React from 'react';

import img1 from '../../../assets/images/electronics/1.jpg';
import img2 from '../../../assets/images/electronics/2.jpg';
import img3 from '../../../assets/images/electronics/3.jpg';
import img4 from '../../../assets/images/electronics/4.jpg';
import img5 from '../../../assets/images/electronics/5.jpg';

const DealsAndOffers = () => {
  const products = [
    { img: img1, title: 'Electric kattle', discount: '-20%' },
    { img: img2 , title: 'Headsets', discount: '-45%' },
    { img: img3 , title: 'Smart watches', discount: '-15%' },
    { img: img4 , title: 'HP Laptop', discount: '-20%' },
    { img: img5, title: 'Canon camera', discount: '-20%' },
  ];

  return (
    <section className="pb-3">
      <div className="container">
        <div className="card overflow-hidden">
          <div className="row gx-0">
          <aside className="col-lg-3 p-4">
  {/* Default: row on small screens, column on md+ */}
  <div className="d-flex flex-row flex-md-column justify-content-between align-items-center">
    
    {/* Header: stays on top on md+, left on mobile */}
    <header className="mb-2 mb-md-3 text-start w-100">
      <h5 className="mb-1">Deals and offers</h5>
      <p className="mb-0">Hygiene equipments</p>
    </header>

    {/* Timer: to the right on mobile, bottom on md+ */}
    <div className="timer d-flex justify-content-end w-100">
      {/* Only show Days on small screen (hide on md+) */}
     <div className="d-none d-md-block me-2">
  <span className="num">04</span>
  <small>Days</small>
</div>


      {/* These show on all screens */}
      <div className="me-2">
        <span className="num">12</span>
        <small>Hours</small>
      </div>
      <div className="me-2">
        <span className="num">58</span>
        <small>Min</small>
      </div>
      <div>
        <span className="num">02</span>
        <small>Sec</small>
      </div>
    </div>
  </div>
</aside>

            <div className="col-lg-9 border-start">
  <div className="row gx-0 bordered-cols flex-nowrap overflow-auto d-flex d-md-none">
    {products.map((product, index) => (
      <div className="col-6 flex-shrink-0" key={index} style={{ maxWidth: '160px' }}>
        <figure className="card-product product-sm p-2">
          <a
            href="#"
            className="img-wrap p-2"
            onClick={(e) => e.preventDefault()}
          >
            <img src={product.img} alt={product.title} />
          </a>
          <div className="p-3 text-center">
            <a
              href="#"
              className="title"
              onClick={(e) => e.preventDefault()}
            >
              {product.title}
            </a>
            <span className="badge bg-danger rounded-pill">{product.discount}</span>
          </div>
        </figure>
      </div>
    ))}
  </div>

  {/* Optional: Desktop View */}
  <div className="row gx-0 bordered-cols d-none d-md-flex">
    {products.map((product, index) => (
      <div className="col-md col-sm-4 col-6" key={index}>
        <figure className="card-product product-sm p-2">
          <a
            href="#"
            className="img-wrap p-2"
            onClick={(e) => e.preventDefault()}
          >
            <img src={product.img} alt={product.title} />
          </a>
          <div className="p-3 text-center">
            <a
              href="#"
              className="title"
              onClick={(e) => e.preventDefault()}
            >
              {product.title}
            </a>
            <span className="badge bg-danger rounded-pill">{product.discount}</span>
          </div>
        </figure>
      </div>
    ))}
  </div>
</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsAndOffers;