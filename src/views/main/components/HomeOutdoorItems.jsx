import React from "react";

import img1 from '../../../assets/images/home/h1.jpg';
import img2 from '../../../assets/images/home/h2.jpg';
import img3 from '../../../assets/images/home/h3.jpg';
import img4 from '../../../assets/images/home/h4.jpg';
import img5 from '../../../assets/images/home/h5.jpg';
import img6 from '../../../assets/images/home/h6.jpg';
import img7 from '../../../assets/images/home/h7.jpg';
import img8 from '../../../assets/images/home/h8.jpg';

import interior from '../../../assets/images/banners/interior.jpg';


const HomeOutdoorItems = () => {
 const items = [
    { title: "Armchairs", img: img1, price: 25 },
    { title: "Office chairs", img: img2, price: 19 },
    { title: "Kitchen dishes", img: img3, price: 7 },
    { title: "Home Plants", img: img4, price: 10 },
    { title: "For Bedroom", img: img5, price: 12 },
    { title: "Home Lighting", img: img6, price: 19 },
    { title: "Best items", img: img7, price: 19 },
    { title: "Category name", img: img8, price: 19 },
  ];

  return (
    <section className="pb-3">
      <div className="container">
        <div className="card overflow-hidden">
          <div className="row gx-0">
            <aside
              className="col-lg-3 p-4 bg-cover"
              style={{ backgroundImage: interior }}
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