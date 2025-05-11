import React from "react";

const Footer = () => {
  return (
    <footer className="section-footer footer-dark bg-white">
      <div className="container">
        <section className="footer-main padding-y">
          <div className="row">
            <aside className="col-12 col-sm-12 col-lg-4">
              <article className="me-lg-5">
                <img
                  src="https://previews.123rf.com/images/sommersby/sommersby1503/sommersby150300215/37207587-blue-flat-shopping-bag-icon.jpg"
                  height="44"
                  className="logo-footer"
                  alt="Logo"
                />
                <p className="mt-3 text-muted">
                  here is some information about our company, We work since 1990
                  and still growing. This is just good html template
                </p>
                <nav className="mb-4 mb-lg-0">
                  <a
                    className="btn btn-icon"
                    title="Facebook"
                    target="_blank"
                    href="#"
                    style={{ color: "gray" }}
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    className="btn btn-icon"
                    title="Instagram"
                    target="_blank"
                    href="#"
                    style={{ color: "gray" }}
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    className="btn btn-icon"
                    title="Youtube"
                    target="_blank"
                    href="#"
                    style={{ color: "gray" }}
                  >
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a
                    className="btn btn-icon"
                    title="Twitter"
                    target="_blank"
                    href="#"
                    style={{ color: "gray" }}
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                </nav>
              </article>
            </aside>

            {/* Store */}
            <aside className="col-6 col-sm-4 col-lg-2">
              <h6 className="title text-dark">Store</h6>
              <ul className="list-menu mb-4">
                <li><a href="#" className="text-body-secondary">About us</a></li>
                <li><a href="#" className="text-body-secondary">Find store</a></li>
                <li><a href="#" className="text-body-secondary">Categories</a></li>
                <li><a href="#" className="text-body-secondary">Blogs</a></li>
              </ul>
            </aside>

            {/* Information */}
            <aside className="col-6 col-sm-4 col-lg-2">
              <h6 className="title text-dark">Information</h6>
              <ul className="list-menu mb-4">
                <li><a href="#" className="text-body-secondary">Help center</a></li>
                <li><a href="#" className="text-body-secondary">Money refund</a></li>
                <li><a href="#" className="text-body-secondary">Shipping info</a></li>
                <li><a href="#" className="text-body-secondary">Refunds</a></li>
              </ul>
            </aside>

            {/* Support */}
            <aside className="col-6 col-sm-4 col-lg-2">
              <h6 className="title text-dark">Support</h6>
              <ul className="list-menu mb-4">
                <li><a href="#" className="text-body-secondary">Help center</a></li>
                <li><a href="#" className="text-body-secondary">Documents</a></li>
                <li><a href="#" className="text-body-secondary">Account restore</a></li>
                <li><a href="#" className="text-body-secondary">My Orders</a></li>
              </ul>
            </aside>

            {/* Download */}
            <aside className="col-6 col-sm-4 col-lg-2">
              <h6 className="title text-dark">Download</h6>
              <a href="#" className="mb-2 d-inline-block">
                <img
                  src="https://ecommerce-ui.com/uikit/images/misc/btn-appstore.png"
                  height="40"
                  alt="App Store"
                />
              </a>
              <a href="#" className="mb-2 d-inline-block">
                <img
                  src="https://ecommerce-ui.com/uikit/images/misc/btn-market.png"
                  height="40"
                  alt="Google Play"
                />
              </a>
            </aside>
          </div>
        </section>

        <hr className="my-0" />

        {/* Footer Bottom */}
       
      </div>
      <section className="footer-bottom d-flex justify-content-between py-3 px-5 bg-light">
          <div className="text-muted">© 2018-2024 Ecommerce UI.</div>
          <nav className="dropup">
            <button
              className="dropdown-toggle btn text-dark align-items-center"
              type="button"
              data-bs-toggle="dropdown"
            >
              <img
                src="https://ecommerce-ui.com/uikit/images/flags/flag-usa.png"
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
    </footer>
  );
};

export default Footer;
