import React from 'react';

const DealsAndOffers = () => {
  const products = [
    { img: 'https://ecommerce-ui.com/uikit/images/items/tech/10.jpg', title: 'Electric kattle', discount: '-20%' },
    { img: 'https://ecommerce-ui.com/uikit/images/items/tech/9.jpg', title: 'Headsets', discount: '-45%' },
    { img: 'https://ecommerce-ui.com/uikit/images/items/tech/8.jpg', title: 'Smart watches', discount: '-15%' },
    { img: 'https://ecommerce-ui.com/uikit/images/items/tech/7.jpg', title: 'HP Laptop', discount: '-20%' },
    { img: 'https://ecommerce-ui.com/uikit/images/items/tech/6.jpg', title: 'Canon camera', discount: '-20%' },
  ];

  return (
    <section className="pb-3">
      <div className="container">
        <div className="card overflow-hidden">
          <div className="row gx-0">
            <aside className="col-lg-3 p-4">
              <header>
                <h3>Deals and offers</h3>
                <p>Hygiene equipments</p>
              </header>
              <div className="timer">
                <div><span className="num">04</span> <small>Days</small></div>
                <div><span className="num">12</span> <small>Hours</small></div>
                <div><span className="num">58</span> <small>Min</small></div>
                <div><span className="num">02</span> <small>Sec</small></div>
              </div>
            </aside>

            <div className="col-lg-9 border-start">
              <div className="row gx-0 bordered-cols">
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
                        <span className="badge bg-danger rounded-pill"> {product.discount} </span>
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