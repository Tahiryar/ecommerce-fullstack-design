import React from 'react';

const products = [
  {
    image: 'https://ecommerce-ui.com/uikit/images/items/cloth/1.jpg',
    price: '$24.00',
    title: 'T-shirts with multiple colors, for men',
  },
  {
    image: 'https://ecommerce-ui.com/uikit/images/items/cloth/2.jpg',

    price: '$29.90',
    title: 'T-shirts with blue color, unisex model',
  },
  {
    image: 'https://ecommerce-ui.com/uikit/images/items/cloth/3.jpg',

    price: '$790.50',
    title: 'Casual Winter Jacket, Brown Color',
  },
  {
    image: 'https://ecommerce-ui.com/uikit/images/items/cloth/4.jpg',

    price: '$12.00',
    title: 'Jeans shorts for men darkblue color',
  },
  {
    image: 'https://ecommerce-ui.com/uikit/images/items/cloth/5.jpg',

    price: '$192.50',
    title: 'Lightweight Jeans bag for travel, Unisex model',
  },
  {
    image: 'https://ecommerce-ui.com/uikit/images/items/cloth/6.jpg',
    price: '$790.50',
    title: 'GoPro HERO6 4K Action Camera - Black',
  },
  {
    image: 'https://ecommerce-ui.com/uikit/images/items/cloth/7.jpg',
    price: '$790.50',
    title: 'Ceramic Jug for Kitchen, Medium size',
  },
  {
    image: 'https://ecommerce-ui.com/uikit/images/items/interior/2.jpg',
    price: '$790.50',
    title: 'Armchair for Home and Office, Yellow color',
  },
  {
    image: 'https://ecommerce-ui.com/uikit/images/items/tech/7.jpg',
    price: '$790.50',
    title: 'Airbed Blue Soft Material With Pump',
  },
  {
    image: 'https://ecommerce-ui.com/uikit/images/items/cloth/5.jpg',
    price: '$19.50',
    title: 'Lightweight Jeans bag for travel, Unisex model',
  },
];

const NewProductsSection = () => {
  return (
    <section className="pb-3">
      <div className="container">
        <header className="section-heading">
          <h3>New products</h3>
        </header>

        <div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-2">
          {products.map((product, index) => (
            <div className="col" key={index}>
              <figure className="card card-product-grid p-3 " style={{ height: "330px" }}>
              <a
    href="#"
    className="img-wrap d-block"
    onClick={(e) => e.preventDefault()}
    style={{
      width: "100%",
      height: "180px",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

  
    }}
  >
    <img
      src={product.image}
      alt={product.title}
      style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
    />
  </a>
                <figcaption className="p-3">
                  <div className="price-wrap">
                    <span className="price">{product.price}</span>
                  </div>
                  <a href="#" className="title" onClick={(e) => e.preventDefault()}>
                    {product.title}
                  </a>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewProductsSection;