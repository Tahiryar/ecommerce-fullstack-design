import React from "react";

export default function HeaderComponent() {
  return (
    <header className="section-header mobile-hidden">
      <section className="header-main bg-white border-bottom py-lg-3 py-2">
        <div className="container">
          <div className="row gx-2 align-items-center">
            <div className="col-xl-2 col-lg col-6 col-sm-6 col-md flex-grow-0">
              <a href="#" className="brand-wrap me-3">
                <img className="logo" height="40" src="./Website layout sample_files/logo.svg" alt="Logo" />
              </a>
            </div>

            <div className="col-xl-7 col-lg-5 col-12 col-sm-12 col-md">
              <form action="#" className="search my-3 my-lg-0 ms-xl-4">
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control"
                    style={{ width: "55%" }}
                    placeholder="Search"
                  />
                  <select className="form-select">
                    <option value="">All type</option>
                    <option value="codex">Special</option>
                    <option value="comments">Only best</option>
                    <option value="content">Latest</option>
                  </select>
                  <button className="btn btn-primary">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </form>
            </div>

            <div className="col-xl-3 col-lg-4 col-md-12 col-12">
              <nav className="d-flex justify-content-end ms-4">
                {["user", "comment-dots", "heart", "shopping-cart"].map((icon, i) => (
                  <div key={i} className="col mx-2 text-center">
                    <a href="#" className="text-muted hover:text-dark" onClick={(e) => e.preventDefault()}>
                      <span className="fs-5 d-inline-block position-relative">
                        <i className={`fa fa-${icon}`}></i>
                        {icon === "comment-dots" && <span className="notify">1</span>}
                      </span>
                      <small className="d-block text-dark text-truncate">
                        {icon === "user" && "Profile"}
                        {icon === "comment-dots" && "Message"}
                        {icon === "heart" && "Saved"}
                        {icon === "shopping-cart" && "Cart"}
                      </small>
                    </a>
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </section>

      <nav className="navbar navbar-light bg-white navbar-expand-lg border-bottom">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar_main"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbar_main">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" onClick={e => e.preventDefault()}>
                  All templates
                </a>
                <nav className="dropdown-menu p-4">
                  <div className="d-flex flex-wrap flex-sm-nowrap">
                    {[
                      {
                        title: "Ads website",
                        links: ["Ads home", "Ads listing", "Ads detail"]
                      },
                      {
                        title: "Techstore",
                        links: ["Main page", "Listing view", "Item details"]
                      },
                      {
                        title: "Marketplace",
                        links: ["Main page", "Listing view", "Grid view", "Item detail", "Cart page", "Order page"]
                      },
                      {
                        title: "Food order",
                        links: ["Main page", "Restaurant foods", "Food order"]
                      },
                      {
                        title: "Common pages",
                        links: ["Pricing page", "User profile", "User register"]
                      }
                    ].map((section, index) => (
                      <div key={index} style={{ width: "12rem" }}>
                        <h6>{section.title}</h6>
                        <ul className="list-menu mb-3">
                          {section.links.map((link, i) => (
                            <li key={i}><a className="text-body" href="#">{link}</a></li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <figure className="p-5 text-center bg-warning-subtle rounded">
                    <a href="#" className="btn btn-warning">Preview all templates</a>
                  </figure>
                </nav>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" onClick={e => e.preventDefault()}>
                  Pages
                </a>
                <ul className="dropdown-menu">
                  {["Main page", "Listing view", "Grid view", "Detail page", "Cart page", "Order page"].map((item, i) => (
                    <li key={i}><a className="dropdown-item" href="#">{item}</a></li>
                  ))}
                </ul>
              </li>
              {["About", "Services", "Projects", "Fitness sport"].map((item, i) => (
                <li key={i} className="nav-item">
                  <a className="nav-link" href="#" onClick={e => e.preventDefault()}>{item}</a>
                </li>
              ))}
            </ul>

            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" onClick={e => e.preventDefault()}>
                  USD
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  {["RUBL", "UZS"].map((currency, i) => (
                    <a key={i} className="dropdown-item" href="#" onClick={e => e.preventDefault()}>{currency}</a>
                  ))}
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" onClick={e => e.preventDefault()}>
                  English
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  {["Russian", "Uzbek"].map((lang, i) => (
                    <a key={i} className="dropdown-item" href="#" onClick={e => e.preventDefault()}>{lang}</a>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}