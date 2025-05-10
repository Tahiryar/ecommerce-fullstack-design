import React from "react";

const PromoBanner = () => {
  return (
    <section className="padding-bottom">
      <div className="container">
        <article
          className="card border-0 bg-primary bg-cover"
          style={{ backgroundImage: "url(images/banners/bg-warehouse.jpg)" }}
        >
          <div className="card-body p-lg-4">
            <a href="#" className="mt-2 me-3 float-end btn btn-warning" onClick={(e) => e.preventDefault()}>
              Learn more
            </a>
            <h4 className="text-white">Super discount on more than 100 USD</h4>
            <p className="text-white lead mb-0">You ever write dummy info</p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default PromoBanner;