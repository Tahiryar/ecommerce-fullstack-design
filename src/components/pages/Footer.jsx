import React from "react";

const Footer = () => {
  return (
    <footer className="section-footer footer-dark bg-dark">
      <div className="container">
        <section className="footer-main padding-y">
          <div className="row">
            <aside className="col-12 col-sm-12 col-lg-4">
              <article className="me-lg-5">
                <img
                  src="./Website layout sample_files/logo-white.png"
                  height="44"
                  className="logo-footer"
                  alt="Logo"
                />
                <p className="mt-3 text-white-50">
                  here is some information about our company, We work since 1990
                  and still growing. This is just good html template
                </p>
                <nav className="mb-4 mb-lg-0">
                  <a
                    className="btn btn-icon btn-primary"
                    title="Facebook"
                    target="_blank"
                    href="#"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    className="btn btn-icon btn-primary"
                    title="Instagram"
                    target="_blank"
                    href="#"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    className="btn btn-icon btn-primary"
                    title="Youtube"
                    target="_blank"
                    href="#"
                  >
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a
                    className="btn btn-icon btn-primary"
                    title="Twitter"
                    target="_blank"
                    href="#"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                </nav>
              </article>
            </aside>

            {/* Store */}
            <aside className="col-6 col-sm-4 col-lg-2">
              <h6 className="title">Store</h6>
              <ul className="list-menu mb-4">
                <li><a href="#">About us</a></li>
                <li><a href="#">Find store</a></li>
                <li><a href="#">Categories</a></li>
                <li><a href="#">Blogs</a></li>
              </ul>
            </aside>

            {/* Information */}
            <aside className="col-6 col-sm-4 col-lg-2">
              <h6 className="title">Information</h6>
              <ul className="list-menu mb-4">
                <li><a href="#">Help center</a></li>
                <li><a href="#">Money refund</a></li>
                <li><a href="#">Shipping info</a></li>
                <li><a href="#">Refunds</a></li>
              </ul>
            </aside>

            {/* Support */}
            <aside className="col-6 col-sm-4 col-lg-2">
              <h6 className="title">Support</h6>
              <ul className="list-menu mb-4">
                <li><a href="#">Help center</a></li>
                <li><a href="#">Documents</a></li>
                <li><a href="#">Account restore</a></li>
                <li><a href="#">My Orders</a></li>
              </ul>
            </aside>

            {/* Download */}
            <aside className="col-6 col-sm-4 col-lg-2">
              <h6 className="title">Download</h6>
              <a href="#" className="mb-2 d-inline-block">
                <img
                  src="./Website layout sample_files/btn-appstore.png"
                  height="40"
                  alt="App Store"
                />
              </a>
              <a href="#" className="mb-2 d-inline-block">
                <img
                  src="./Website layout sample_files/btn-market.png"
                  height="40"
                  alt="Google Play"
                />
              </a>
            </aside>
          </div>
        </section>

        <hr className="my-0" />

        {/* Footer Bottom */}
        <section className="footer-bottom d-flex justify-content-between">
          <div className="text-white-50">© 2018-2024 Ecommerce UI.</div>
          <nav className="dropup">
            <button
              className="dropdown-toggle btn text-white align-items-center"
              type="button"
              data-bs-toggle="dropdown"
            >
              <img
                src="./Website layout sample_files/flag-usa.png"
                className="me-2"
                height="20"
                alt="Flag"
              />
              <span>English</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><a className="dropdown-item" href="#">Russian</a></li>
              <li><a className="dropdown-item" href="#">Arabic</a></li>
              <li><a className="dropdown-item" href="#">Spanish</a></li>
            </ul>
          </nav>
        </section>
      </div>
    </footer>
  );
};

export default Footer;