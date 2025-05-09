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

            {/* Icons Navigation */}
            <div className="col-xl-3 col-lg-4 col-md-12 col-12">
              <nav className="d-flex justify-content-end gap-4">
                {[
                  {icon: "user", text: "Profile"},
                  {icon: "comment-dots", text: "Message", notify: 1},
                  {icon: "box", text: "Orders"},
                  {icon: "shopping-cart", text: "My cart"}
                ].map((item, i) => (
                  <a key={i} href="#" className="text-dark text-decoration-none text-center">
                    <div className="position-relative">
                      <i className={`fa fa-${item.icon} fs-5`}></i>
                      {item.notify && <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">{item.notify}</span>}
                    </div>
                    <small className="d-block">{item.text}</small>
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
          <div className="collapse navbar-collapse" id="navbar_main">
            <ul className="navbar-nav">
              {/* Main Navigation Items */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                  All category
                </a>
                <ul className="dropdown-menu">
                  {["Hot offers", "Gift boxes", "Projects"].map((item, i) => (
                    <li key={i}><a className="dropdown-item" href="#">{item}</a></li>
                  ))}
                </ul>
              </li>
              
              {["Hot offers", "Gift boxes", "Projects", "Menu item", "Help"].map((item, i) => (
                <li key={i} className="nav-item">
                  <a className="nav-link" href="#">{item}</a>
                </li>
              ))}
            </ul>

            {/* Right Side Navigation */}
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                  English, USD
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <div className="d-flex p-3">
                    <div className="me-4">
                      <h6>Currency</h6>
                      {["USD", "RUBL", "UZS"].map((currency, i) => (
                        <a key={i} className="dropdown-item" href="#">{currency}</a>
                      ))}
                    </div>
                    <div className="ms-4">
                      <h6>Language</h6>
                      {["English", "Russian", "Uzbek"].map((lang, i) => (
                        <a key={i} className="dropdown-item" href="#">{lang}</a>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Ship to</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}