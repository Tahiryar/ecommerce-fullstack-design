import React, { useState } from 'react';

const ProductHeaderBar = () => {
  const [isVerifiedOnly, setIsVerifiedOnly] = useState(false);
  const [sortOption, setSortOption] = useState('0');

  return (
    <div className="p-3 d-md-flex align-items-center bg-white  mb-3 rounded">
      {/* Left side */}
      <span className="d-block py-2">
        12,911 items in <b>Equipments</b>
      </span>

      {/* Right side */}
      <div className="ms-auto d-md-flex align-items-center gap-3">
        <label className="form-check my-2 me-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isVerifiedOnly}
            onChange={(e) => setIsVerifiedOnly(e.target.checked)}
          />
          <span className="form-check-label"> Verified only </span>
        </label>

        <select
          className="form-select d-inline-block w-auto"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="0">Best match</option>
          <option value="1">Recommended</option>
          <option value="2">High rated</option>
          <option value="3">Cheap first</option>
        </select>

        <div className="btn-group">
          <a
            className="btn btn-light active"
            href="/uikit/p-market-list"
            aria-label="List view"
            title="List view"
          >
            <i className="fa fa-bars"></i>
          </a>
          <a
            className="btn btn-light"
            href="/uikit/p-market-list-grid"
            aria-label="Grid view"
            title="Grid view"
          >
            <i className="fa fa-th"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductHeaderBar;