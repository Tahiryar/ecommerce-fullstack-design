import React from 'react';

const ProductTabs = () => {
  return (
    <div className="card mb-4">
      <header className="card-header">
        <ul className="nav nav-tabs card-header-tabs" role="tablist">
          <li className="nav-item" role="presentation">
            <a className="nav-link active" data-bs-toggle="tab" data-bs-target="#details" aria-current="true" href="#" onClick={(e) => e.preventDefault()} aria-selected="true" role="tab">Description</a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" data-bs-toggle="tab" data-bs-target="#reviews" href="#" onClick={(e) => e.preventDefault()} aria-selected="false" tabIndex="-1" role="tab">Reviews</a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" data-bs-toggle="tab" data-bs-target="#shipping" href="#" onClick={(e) => e.preventDefault()} aria-selected="false" tabIndex="-1" role="tab">Shipping</a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" data-bs-toggle="tab" data-bs-target="#seller" href="#" onClick={(e) => e.preventDefault()} aria-selected="false" tabIndex="-1" role="tab">About Seller</a>
          </li>
        </ul>
      </header>
      <div className="tab-content card-body">
        <article className="tab-pane active" id="details" role="tabpanel">
          <p>With supporting text below as a natural lead-in to additional content. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          
          <table width="70%" className="table border">
            <tbody>
              <tr>
                <td width="100" className="bg-light text-muted">Model</td>
                <td width="200">Latest model A-123121</td>
              </tr>
              <tr>
                <td width="100" className="bg-light text-muted">Style</td>
                <td width="200">Classic style</td>
              </tr>
              <tr>
                <td width="100" className="bg-light text-muted">Certificate</td>
                <td width="200">ISO-8791287391231</td>
              </tr>
            </tbody>
          </table>
          <ul className="list-check cols-one">
            <li>Some great feature name here</li>
            <li>Lorem ipsum dolor sit amet, consectetur</li>
            <li>Duis aute irure dolor in reprehenderit</li>
            <li>Duis aute irure dolor in reprehenderit</li>
            <li>Duis aute irure dolor in reprehenderit</li>
            
          </ul>
        </article>
        <article className="tab-pane" id="reviews" role="tabpanel">
          <h6>Reviews</h6>
          <p>Culpa reprehenderit, nam doloribus possimus sapiente quo cumque maxime rerum.</p>
        </article>
        <article className="tab-pane" id="shipping" role="tabpanel">
          <h6>Shipping Information</h6>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </article>
        <article className="tab-pane" id="seller" role="tabpanel">
          <h6>About Seller</h6>
          <p>Seller Culpa reprehenderit, nam doloribus possimus sapiente quo cumque maxime rerum.</p>
        </article>
      </div>
    </div>
  );
};

export default ProductTabs;