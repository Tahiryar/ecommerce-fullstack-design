// SidebarFilter.js
import React from 'react';

const SidebarFilter = () => {
  return (
    <aside className="p-4 border-end bg-light" style={{ width: '250px', minHeight: '100vh' }}>
      <h5>Related category</h5>
      <ul className="list-unstyled">
        {['Equipments', 'Home items', 'Home Gadgets', 'TV sets', 'Microchips', 'Smartphones', 'See more'].map((item, i) => (
          <li key={i}><a href="#" className="text-decoration-none">{item}</a></li>
        ))}
      </ul>

      <h6 className="mt-4">Brands</h6>
      {['Panasonic', 'Toyota', 'Xiaomi', 'Apple', 'Samsung'].map((brand, i) => (
        <div className="form-check" key={i}>
          <input className="form-check-input" type="checkbox" id={brand} />
          <label className="form-check-label" htmlFor={brand}>{brand}</label>
        </div>
      ))}

      <h6 className="mt-4">Features</h6>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" id="SuperAmoled" />
        <label className="form-check-label" htmlFor="SuperAmoled">Super Amoled</label>
      </div>
    </aside>
  );
};

export default SidebarFilter;