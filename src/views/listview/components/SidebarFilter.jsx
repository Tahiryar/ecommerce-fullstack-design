import React from 'react';

const SidebarFilter = () => {
  return (
    <aside className="col-xl-2 col-lg-3 p-3 m-3">
      <button
        className="btn btn-outline-secondary mb-3 w-100 d-lg-none"
        data-bs-toggle="collapse"
        data-bs-target="#aside_filter"
      >
        Show filter
      </button>

      <div id="aside_filter" className="collapse d-lg-block mb-5">
        {/* Related Category */}
        <article>
          <a
            href="#"
            className="fw-bold text-dark py-3 d-block border-top"
            data-bs-toggle="collapse"
            data-bs-target="#collapse_aside1"
            onClick={(e) => e.preventDefault()}
          >
            Related category <i className="icon-control fa fa-chevron-down"></i>
          </a>
          <div className="collapse show" id="collapse_aside1">
            <div className="pb-3">
              <ul className="list-menu mb-0">
                {['Equipments', 'Home items', 'Home Gadgets', 'TV sets', 'Microchips', 'Smartphones'].map((item, idx) => (
                  <li key={idx}><a href="#" onClick={(e) => e.preventDefault()}>{item}</a></li>
                ))}
              </ul>
              <a href="#" className="text-secondary hover:text-primary" onClick={(e) => e.preventDefault()}>
                See more <i className="fa fa-chevron-down fa-sm"></i>
              </a>
            </div>
          </div>
        </article>

        {/* Brands */}
        <article>
          <a
            href="#"
            className="fw-bold text-dark py-3 d-block border-top"
            data-bs-toggle="collapse"
            data-bs-target="#collapse_aside_brands"
            onClick={(e) => e.preventDefault()}
          >
            Brands <i className="icon-control fa fa-chevron-down"></i>
          </a>
          <div className="collapse show" id="collapse_aside_brands">
            <div className="pb-3">
              {['Panasonic', 'Toyota', 'Xiaomi', 'Apple', 'Samsung'].map((brand, idx) => (
                <label className="form-check mb-2" key={idx}>
                  <input className="form-check-input" type="checkbox" value="" />
                  <span className="form-check-label"> {brand} </span>
                </label>
              ))}
              <a href="#" className="text-secondary hover:text-primary" onClick={(e) => e.preventDefault()}>
                See more <i className="fa fa-chevron-down fa-sm"></i>
              </a>
            </div>
          </div>
        </article>

        {/* Features */}
        <article>
          <a
            href="#"
            className="fw-bold text-dark py-3 d-block border-top"
            data-bs-toggle="collapse"
            data-bs-target="#collapse_aside_feature"
            onClick={(e) => e.preventDefault()}
          >
            Features <i className="icon-control fa fa-chevron-down"></i>
          </a>
          <div className="collapse show" id="collapse_aside_feature">
            <div className="pb-3">
              {['Metallic frame', 'Super Amoled', 'Battery included', 'Large screen', 'Extra memory'].map((feature, idx) => (
                <label className="form-check mb-2" key={idx}>
                  <input className="form-check-input" type="checkbox" value="" defaultChecked={feature === 'Super Amoled' || feature === 'Battery included'} />
                  <span className="form-check-label"> {feature} </span>
                </label>
              ))}
              <a href="#" className="text-secondary hover:text-primary" onClick={(e) => e.preventDefault()}>
                See more <i className="fa fa-chevron-down fa-sm"></i>
              </a>
            </div>
          </div>
        </article>

        {/* Price Range */}
        <article>
          <a
            href="#"
            className="fw-bold text-dark py-3 d-block border-top"
            data-bs-toggle="collapse"
            data-bs-target="#collapse_aside2"
            onClick={(e) => e.preventDefault()}
          >
            Price range <i className="icon-control fa fa-chevron-down"></i>
          </a>
          <div className="collapse show" id="collapse_aside2">
            <div className="pb-3">
              <input type="range" className="form-range" min="0" max="100" />
              <div className="row mb-2 g-2">
                <div className="col-6">
                  <label htmlFor="min" className="form-label">Min</label>
                  <input className="form-control" id="min" placeholder="$0" />
                </div>
                <div className="col-6">
                  <label htmlFor="max" className="form-label">Max</label>
                  <input className="form-control" id="max" placeholder="$9999" />
                </div>
              </div>
              <button className="btn btn-outline-secondary w-100" type="button">Apply</button>
            </div>
          </div>
        </article>

        {/* Condition */}
        <article className="filter-group">
          <a
            href="#"
            className="fw-bold text-dark py-3 d-block border-top"
            data-bs-toggle="collapse"
            data-bs-target="#collapse_aside3"
            onClick={(e) => e.preventDefault()}
          >
            Condition <i className="icon-control fa fa-chevron-down"></i>
          </a>
          <div className="collapse show" id="collapse_aside3">
            <div className="pb-3">
              {['Any', 'Refurbished', 'Damaged', 'Brand new'].map((cond, idx) => (
                <label className="form-check mb-2" key={idx}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="condition"
                    value=""
                    defaultChecked={cond === 'Any'}
                  />
                  <span className="form-check-label"> {cond} </span>
                </label>
              ))}
            </div>
          </div>
        </article>

        {/* Ratings */}
        <article className="filter-group">
          <a
            href="#"
            className="fw-bold text-dark py-3 d-block border-top"
            data-bs-toggle="collapse"
            data-bs-target="#collapse_aside4"
            onClick={(e) => e.preventDefault()}
          >
            Ratings <i className="icon-control fa fa-chevron-down"></i>
          </a>
          <div className="collapse show" id="collapse_aside4">
            <div className="pb-3">
              {[100, 80, 60].map((percent, idx) => (
                <label className="form-check mb-2" key={idx}>
                  <input className="form-check-input" type="checkbox" value="" />
                  <span className="form-check-label">
                    <ul className="rating-stars">
                      <li className="stars-active" style={{ width: `${percent}%` }}>
                        <img src="images/misc/stars-active.svg" alt="" />
                      </li>
                      <li>
                        <img src="images/misc/starts-disable.svg" alt="" />
                      </li>
                    </ul>
                  </span>
                </label>
              ))}
            </div>
          </div>
        </article>
      </div>
    </aside>
  );
};

export default SidebarFilter;