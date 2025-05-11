import React from "react";

const NewsletterSection = () => {
  return (
    <section
      className="padding-y-lg"
      style={{ backgroundColor: "#f8f9fa" }} // Light grey background
    >
      <div className="container">
        <h4 className="text-center">Subscribe on our newsletter</h4>
        <p className="pb-2 text-center">
          Get daily news on upcoming offers from many suppliers all over the
          world
        </p>

        <div style={{ maxWidth: "380px" }} className="mx-auto">
          <div className="d-flex">
            <div className="me-1 flex-grow-1">
              <input
                className="w-100 form-control"
                placeholder="Your Email"
                type="email"
              />
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-envelope"></i> Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
