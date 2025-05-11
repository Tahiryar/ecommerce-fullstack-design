// BreadcrumbNav.js
import React from 'react';

const BreadcrumbNav = () => {
  return (
    <section className="py-4">
      <div className="container">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <a className="text-muted" href="#" onClick={(e) => e.preventDefault()}>
              Home
            </a>
          </li>
          <li className="breadcrumb-item">
            <a className="text-muted" href="#" onClick={(e) => e.preventDefault()}>
              Category name
            </a>
          </li>
          <li className="breadcrumb-item">
            <a className="text-muted" href="#" onClick={(e) => e.preventDefault()}>
              Interiors
            </a>
          </li>
          <li className="breadcrumb-item text-muted" aria-current="page">
            Equipments
          </li>
        </ol>
      </div>
    </section>
  );
};

export default BreadcrumbNav;