import React from 'react';

const Summary = () => (
  <div className="card shadow-lg">
    <div className="card-body">
      <dl className="row">
        <dt className="col-7 fw-normal text-muted">Subtotal:</dt>
        <dd className="col-5 text-end">$143.90</dd>

        <dt className="col-7 fw-normal text-muted">Discount:</dt>
        <dd className="col-5 text-end">- $60.00</dd>

        <dt className="col-7 fw-normal text-muted">Tax:</dt>
        <dd className="col-5 text-end">+ $14.00</dd>

        <dt className="col-7 fw-normal text-muted">Shipping:</dt>
        <dd className="col-5 text-end">+ $9.50</dd>
      </dl>
      <hr />
      <dl className="row">
        <dt className="col-7 h5 text-muted">Total:</dt>
        <dd className="col-5 h5 text-end">$357.90</dd>
      </dl>
      <div className="my-3">
        <a className="btn btn-lg btn-success w-100" href="/uikit/p-market-order">Make Purchase</a>
      </div>
      <p className="text-center mt-3">
        <img src="images/misc/payments.png" height="24" alt="Payments" />
      </p>
    </div>
  </div>
);

export default Summary;