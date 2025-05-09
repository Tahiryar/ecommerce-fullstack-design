import React from 'react';

const YouMayLike = () => {
  const items = [
    {
      imageSrc: "https://ecommerce-ui.com/uikit/images/items/cloth/6.jpg",
      title: "Men's Wallet Leather, Small, Blue color",
      priceRange: "$7.00 - $99.50"
    },
    {
      imageSrc: "https://ecommerce-ui.com/uikit/images/items/cloth/2.jpg",
      title: "Basketball Crew Socks Long Stuff",
      priceRange: "$7.00 - $99.50"
    },
    {
      imageSrc: "https://ecommerce-ui.com/uikit/images/items/cloth/3.jpg",
      title: "Winter Jacket for Men Brown color",
      priceRange: "$7.00 - $99.50"
    },
    {
      imageSrc: "https://ecommerce-ui.com/uikit/images/items/cloth/4.jpg",
      title: "Super Product Name",
      priceRange: "$7.00 - $99.50"
    }
  ];

  return (
    <div className="card p-3">
      <h6 className="card-title">You may like</h6>
      {items.map((item, index) => (
        <figure className="d-flex mb-4" key={index}>
          <a href="#" className="me-2 flex-shrink-0" onClick={(e) => e.preventDefault()}>
            <img className="size-72x72 img-thumbnail" width="72" height="72" src={item.imageSrc} alt="product" />
          </a>
          <figcaption>
            <a href="#" className="text-dark" onClick={(e) => e.preventDefault()}>{item.title}</a>
            <p className="text-muted mb-0">{item.priceRange}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
};

export default YouMayLike;