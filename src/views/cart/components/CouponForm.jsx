import React from 'react';

const CouponForm = () => (
  <div className="card p-3 mb-3">
    <form>
      <div>
        <label className="form-label">Have coupon?</label>
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Add coupon" />
          <button className="btn btn-light">Apply</button>
        </div>
      </div>
    </form>
  </div>
);

export default CouponForm;