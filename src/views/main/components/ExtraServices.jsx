import React from "react";

const ExtraServices = () => {
  const services = [
    {
      imgSrc: "https://ecommerce-ui.com/uikit/images/posts/1.jpg",
      title: "Source from Industry Hubs",
    },
    {
      imgSrc: "https://ecommerce-ui.com/uikit/images/posts/2.jpg",
      title: "Customize Your Products",
    },
    {
      imgSrc: "https://ecommerce-ui.com/uikit/images/posts/3.jpg",
      title: "Fast shipping by ocean or air",
    },
    {
      imgSrc: "https://ecommerce-ui.com/uikit/images/posts/4.jpg",
      title: "Product monitoring service",
    },
  ];

  return (
    <section className="mb-4">
      <div className="container">
        <header className="section-heading">
          <h3>Our extra services</h3>
        </header>
        <div className="row">
          {services.map((service, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-12">
              <article className="card mb-3">
                <img
                  className="card-img-top"
                  src={service.imgSrc}
                  alt={service.title}
                  height="160"
                />
                <div className="card-body">
                  <a
                    href="#"
                    className="stretched-link text-body"
                    onClick={(e) => e.preventDefault()}
                  >
                    {service.title}
                  </a>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExtraServices;