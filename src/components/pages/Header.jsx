import React from "react";

export default function HeaderComponent() {
  return (
    <header className="section-header mobile-hidden">
      {/* Top Header Section */}
      <section className="header-main bg-white border-bottom py-lg-3 py-2">
        <div className="container">
          <div className="row gx-2 align-items-center">
            {/* Logo and Brand */}
            <div className="col-xl-2 col-lg col-6 col-sm-6 col-md flex-grow-0">
              <a href="#" className="brand-wrap me-3 d-flex align-items-center">
                <img className="logo" height="40" src="./Website layout sample_files/logo.svg" alt="Logo" />
                <span className="ms-2 fw-bold">Brand</span>
              </a>
            </div>

            {/* Search and Category */}
            <div className="col-xl-7 col-lg-5 col-12 col-sm-12 col-md">
              <div className="d-flex align-items-center">
                <div className="dropdown me-2">
                  <button
                    className="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    style={{ minWidth: "120px" }}
                  >
                    All category
                  </button>
                  <ul className="dropdown-menu">
                    {["Vintage", "Other", "W/usr"].map((item, i) => (
                      <li key={i}><a className="dropdown-item" href="#">{item}</a></li>
                    ))}
                  </ul>
                </div>

                <form action="#" className="search flex-grow-1">
                  <div className="input-group">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search"
                    />
                    <button className="btn btn-primary">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Links */}
            <div className="col-xl-3 col-lg-4 col-md-12 col-12">
              <nav className="d-flex justify-content-end gap-3">
                {["Hot offers", "Gift boxes", "Projects"].map((text, i) => (
                  <a key={i} href="#" className="text-dark text-decoration-none">
                    {text}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Navigation Bar */}
      <nav className="navbar navbar-light bg-white navbar-expand-lg border-bottom">
        <div className="container">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar_main">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbar_main">
            <ul className="navbar-nav">
              {/* Regular Navigation Items */}
              {["All category", "Hot offers", "Gift boxes", "Projects", "Menu item"].map((item, i) => (
                <li key={i} className="nav-item">
                  <a className="nav-link" href="#">{item}</a>
                </li>
              ))}

              {/* Help Dropdown */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                  Help
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">FAQ</a></li>
                  <li><a className="dropdown-item" href="#">Contact Us</a></li>
                  <li><a className="dropdown-item" href="#">Shipping Info</a></li>
                </ul>
              </li>
            </ul>

            {/* Right-side Navigation - Keep Same */}
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                  English, USD
                </a>
                {/* ... (keep currency/language dropdown same) ... */}
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Ship to Germany 🇩🇪</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}