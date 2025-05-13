import React from "react";

import img1 from '../../../assets/images/electronics/1.jpg';
import img2 from '../../../assets/images/electronics/2.jpg';
import img3 from '../../../assets/images/electronics/3.jpg';
import img4 from '../../../assets/images/electronics/4.jpg';
import img5 from '../../../assets/images/electronics/5.jpg';
import img6 from '../../../assets/images/electronics/6.jpg';
import img7 from '../../../assets/images/electronics/7.jpg';
import img8 from '../../../assets/images/electronics/8.jpg';
import img9 from '../../../assets/images/electronics/9.jpg';

import tech from '../../../assets/images/banners/tech.jpg';

const ElectronicsItems = () => {
  const items = [
    { title: "Smartphones", img: img3, price: 299 },
    { title: "Laptops", img: img4, price: 899 },
    { title: "Headphones", img: img2, price: 149 },
    { title: "Smart Watches", img: img3, price: 199 },
    { title: "Tablets", img: img7, price: 399 },
    { title: "Cameras", img: img5, price: 599 },
    { title: "Gaming Consoles", img: img8, price: 499 },
    { title: "Accessories", img: img9, price: 49 },
  ];

  return (
    <section className="pb-3">
      <div className="container">
        <div className="card overflow-hidden">
          <div className="row gx-0">
            {/* Desktop Sidebar */}
            <aside
              className="col-lg-3 p-4 bg-cover d-none d-sm-block"
              style={{ backgroundImage: `url(${tech})` }}
            >
              <header>
                <h3 className="mb-3">
                  Electronics & <br />
                  Gadgets
                </h3>
                <a href="#!" className="btn btn-light" onClick={(e) => e.preventDefault()}>
                  Source now →
                </a>
              </header>
            </aside>

            {/* Main content */}
            <div className="col-lg-9">
              {/* Desktop Grid */}
              <ul className="row g-0 bordered-cols m-0 list-unstyled d-none d-sm-flex">
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

              {/* Mobile layout */}
              <div className="d-sm-none px-2 pt-3">
                <h5 className="mb-3">Consumer Electronics</h5>

                <div className="d-flex overflow-auto mb-3">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 me-2 border p-2"
                      style={{ width: "140px" }}
                    >
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-100 mb-2"
                        style={{ height: "100px", objectFit: "cover" }}
                      />
                      <div className="fw-semibold small">{item.title}</div>
                      <div className="text-muted small">From USD {item.price}</div>
                    </div>
                  ))}
                </div>

                <a href="#!" className="btn btn-link ps-0" onClick={(e) => e.preventDefault()}>
                  Source now →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElectronicsItems;
