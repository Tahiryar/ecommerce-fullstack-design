import React from 'react';
import img1 from '../../../assets/images/cloth/c1.jpg';
import img2 from '../../../assets/images/cloth/c2.jpg';
import img3 from '../../../assets/images/cloth/c3.jpg';
import img4 from '../../../assets/images/cloth/c4.jpg';
import img5 from '../../../assets/images/cloth/c5.jpg';
import img6 from '../../../assets/images/cloth/c6.jpg';
import img7 from '../../../assets/images/cloth/c7.jpg';
import img8 from '../../../assets/images/electronics/4.jpg';
import img9 from '../../../assets/images/home/h1.jpg';

const products = [
  { image: img1, price: '$24.00', title: 'T-shirts with multiple colors, for men' },
  { image: img2, price: '$29.90', title: 'T-shirts with blue color, unisex model' },
  { image: img3, price: '$790.50', title: 'Casual Winter Jacket, Brown Color' },
  { image: img4, price: '$12.00', title: 'Jeans shorts for men darkblue color' },
  { image: img5, price: '$192.50', title: 'Lightweight Jeans bag for travel, Unisex model' },
  { image: img6, price: '$790.50', title: 'GoPro HERO6 4K Action Camera - Black' },
  { image: img7, price: '$790.50', title: 'Ceramic Jug for Kitchen, Medium size' },
  { image: img9, price: '$790.50', title: 'Armchair for Home and Office, Yellow color' },
  { image: img8, price: '$790.50', title: 'Airbed Blue Soft Material With Pump' },
  { image: img5, price: '$19.50', title: 'Lightweight Jeans bag for travel, Unisex model' },
];

const NewProductsSection = () => {
  return (
    <section className="pb-3">
      <div className="container">
        <header className="section-heading mb-4">
          <h3>New products</h3>
        </header>

        <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3">
          {products.map((product, index) => (
            <div className="col" key={index}>
              <figure className="card card-product-grid h-100 p-2">
                <a
                  href="#"
                  className="img-wrap d-block mb-2"
                  onClick={(e) => e.preventDefault()}
                  style={{
                    width: "100%",
                    height: "160px",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f8f8f8",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </a>
                <figcaption className="px-2">
                  <div className="price-wrap">
                    <span className="price">{product.price}</span>
                  </div>
                  <a
                    href="#"
                    className="title text-truncate d-block mt-1"
                    onClick={(e) => e.preventDefault()}
                    title={product.title}
                    style={{ fontSize: "0.9rem" }}
                  >
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
