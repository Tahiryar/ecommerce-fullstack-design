import React from "react";

const HomeOutdoorItems = () => {
  const items = [
    { title: "Armchairs", img: "https://ecommerce-ui.com/uikit/images/items/tech/1.jpg", price: 25 },
    { title: "Office chairs", img: "https://ecommerce-ui.com/uikit/images/items/tech/2.jpg", price: 19 },
    { title: "Kitchen dishes", img: "https://ecommerce-ui.com/uikit/images/items/tech/3.jpg", price: 7 },
    { title: "Home Plants", img: "https://ecommerce-ui.com/uikit/images/items/tech/4.jpg", price: 10 },
    { title: "For Bedroom", img: "https://ecommerce-ui.com/uikit/images/items/tech/5.jpg", price: 12 },
    { title: "Home Lighting", img: "https://ecommerce-ui.com/uikit/images/items/tech/6(1).jpg", price: 19 },
    { title: "Best items", img: "https://ecommerce-ui.com/uikit/images/items/tech/7(1).jpg", price: 19 },
    { title: "Category name", img: "https://ecommerce-ui.com/uikit/images/items/tech/8(1).jpg", price: 19 },
  ];

  return (
    <section className="pb-3">
      <div className="container">
        <div className="card overflow-hidden">
          <div className="row gx-0">
            <aside
              className="col-lg-3 p-4 bg-cover"
              style={{ backgroundImage: "url(images/banners/interior.jpg)" }}
            >
              <header>
                <h3 className="mb-3">
                  Home and <br />
                  outdoor items
                </h3>
                <a href="#!" className="btn btn-light" onClick={(e) => e.preventDefault()}>
                  Source now
                </a>
              </header>
            </aside>

            <div className="col-lg-9">
              <ul className="row g-0 bordered-cols m-0 list-unstyled">
                {items.map((item, index) => (
                  <li key={index} className="col-6 col-lg-3 col-md-4">
                    <div className="card-product p-3 pe-0">
                      <a href="#!" className="title" onClick={(e) => e.preventDefault()}>
                        {item.title}
                      </a>
                      <img className="size-72x72 float-end mb-2" src={item.img} alt={item.title} />
                      <p className="text-muted small">
                        From <br />
                        USD {item.price}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeOutdoorItems;