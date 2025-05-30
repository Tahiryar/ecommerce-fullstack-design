import React from "react";

import mainTechImage from '../../../assets/images/banners/main-tech.png';


const categories = [
  "Electronics",
  "Clothes and wear",
  "Home interiors",
  "Computer and tech",
  "Tools, equipments",
  "Sports and outdoor",
  "Animal and pets",
  "Machinery tools",
  "Other products",
];

const carouselItems = [
  {
    captionTitle: "Latest trending",
    captionSubtitle: "Electronic items",
    image: mainTechImage,
    active: false,
  },
  {
    captionTitle: "Latest deals",
    captionSubtitle: "Best Smartphones",
    image: mainTechImage, 
    active: true,
  },
];


const IntroSection = () => {
  return (
    <section className="section-intro mb-3 mt-3 ">
      <div className="mobile_banner">
        <main className="card mobile_card">
          <div className="row">
            {/* Sidebar Navigation */}
            <aside className="col-lg-3 iconnav">
              <nav className="nav flex-column nav-pills mb-3 mb-lg-0">
                {categories.map((category, idx) => (
                  <a
                    key={idx}
                    className="nav-link"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    {category}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Main Content */}
            <div className="col-lg-9">
              <div className="row">
                {/* Carousel */}
                <div className="col-xxl-9 col-lg-8">
                  <div
                    id="carouselMain"
                    className="carousel-main carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner">
                      {carouselItems.map((item, index) => (
                        <article
                          key={index}
                          className={`carousel-item ${
                            item.active ? "active" : ""
                          }`}
                        >
                          <div className="carousel-caption">
                            <h2 className="mb-3 text-start text-dark">
                              <span className="fw-normal">
                                {item.captionTitle}
                              </span>
                              <br />
                              <strong>{item.captionSubtitle}</strong>
                            </h2>
                          </div>
                          <img
                           
                            src={item.image}
                            className="d-block w-100 img-cover mobile-img-banner"
                            alt="Banner"
                          />
                        </article>
                      ))}
                    </div>
             
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselMain"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>

                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselMain"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>

                {/* Right Sidebar */}
                <div className="col-xxl-3 col-lg-4 d-none d-lg-block">
                  <div className="bg-primary-subtle p-3 rounded mb-3">
                    <p className="d-flex mb-3 text-base">
                      <img
                        src="https://avatars.githubusercontent.com/u/179708755?v=4"
                        className="img-avatar me-2"
                        width="44"
                        height="44"
                        alt="User Avatar"
                      />
                      <span>
                        Hi, user <br />
                        let's get started
                      </span>
                    </p>
                    <a
                      href="#"
                      className="btn btn-sm btn-light w-100"
                      onClick={(e) => e.preventDefault()}
                    >
                      Join now
                    </a>
                  </div>

                  <div className="bg-warning text-white p-3 rounded mb-2">
                    Get US $10 off with a new supplier account
                    <br />
                    <a
                      href="#"
                      className="text-white mt-1 fw-bold d-inline-block"
                      onClick={(e) => e.preventDefault()}
                    >
                      Get now
                    </a>
                  </div>

                  <div className="bg-info text-white p-3 rounded mb-2">
                    Send quotes with supplier preferences
                    <br />
                    <a
                      href="#"
                      className="text-white mt-1 fw-bold d-inline-block"
                      onClick={(e) => e.preventDefault()}
                    >
                      Try now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default IntroSection;