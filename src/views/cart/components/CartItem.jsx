import React from 'react';

const CartItem = ({ img, title, details, price }) => (
  <article className="row mb-4">
    <div className="col-lg-9">
      <figure className="d-flex align-items-start">
        <div className="me-3 flex-shrink-0">
          <img src={img} className="size-100x100 img-thumbnail" alt={title} />
        </div>
        <figcaption className="info">
          <p className="text-muted">{details}</p>
          <a href="#" className="btn btn-light text-danger btn-sm" onClick={e => e.preventDefault()}>Remove</a>
          <a href="#" className="btn btn-light btn-sm" onClick={e => e.preventDefault()}>Save for later</a>
        </figcaption>
      </figure>
    </div>
    <div className="col-lg-3">
      <div className="text-end mb-2">
        <var className="h6">{price}</var>
      </div>
      <select style={{ width: '100px' }} className="float-end form-select">
        <option>Qty.: 1</option>
        <option>Qty.: 2</option>
        <option>Qty.: 3</option>
      </select>
    </div>
  </article>
);

export default CartItem;