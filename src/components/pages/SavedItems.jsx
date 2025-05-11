import React from "react";

const SavedItems = () => {
  const items = [
    {
      id: 1,
      image: "https://ecommerce-ui.com/uikit/images/items/tech/2.jpg",
      name: "Original Product Name",
      price: "$39.99",
    },
    {
      id: 2,
      image: "https://ecommerce-ui.com/uikit/images/items/cloth/5.jpg",
      name: "Jeans Backpack Small",
      price: "$140.00",
    },
    {
      id: 3,
      image: "https://ecommerce-ui.com/uikit/images/items/cloth/4.jpg",
      name: "Mens Jeans Short Blue",
      price: "$132.00",
    },
    {
      id: 4,
      image: "https://ecommerce-ui.com/uikit/images/items/tech/10.jpg",
      name: "Electric Kettle 200 Watt",
      price: "$95.80",
    },
  ];

  const addToCart = (name) => {
    alert(`${name} has been added to your cart!`);
  };

  return (
    <section className="padding-bottom">
      <div className="container">
        <article className="card p-3 p-lg-4 mb-4">
          <h4 className="card-title mb-4">
            Your saved items
          </h4>

          <div className="row">
            {items.map((item) => (
              <div key={item.id} className="col-xxl-2 col-xl-3 col-sm-4 col-6">
                <figure className="card-product-grid product-sm">
                  <a
                    href="#"
                    className="img-wrap border rounded"
                    onClick={(e) => e.preventDefault()}
                  >
                    <img src={item.image} alt={item.name} />
                  </a>
                  <figcaption className="mt-2">
                    <a
                      href="#"
                      className="title"
                      onClick={(e) => e.preventDefault()}
                    >
                      {item.name}
                    </a>
                    <p className="mt-1 mb-2 text-muted">{item.price}</p>
                    <button
                      className="btn btn-light"
                      onClick={() => addToCart(item.name)}
                    >
                      Add to cart
                    </button>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};

export default SavedItems;