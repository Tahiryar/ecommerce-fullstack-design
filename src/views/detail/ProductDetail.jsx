import React from 'react';


import Header from "../../components/Header"
import BreadcrumbNav from './components/BreadcrumbNav';
import ProductTabs from './components/ProductTabs';
import YouMayLike from './components/YouMayLike';
import RelatedProducts from './components/RelatedProducts';
import PromoBanner from './components/PromoBanner'; 
import Footer from '../../components/Footer';
const ProductDetail = () => {
  return (
    
    <div className="bg-light">
    <Header/>
    <BreadcrumbNav title="Products" />

    <div className="container">
      <article className="card p-3 mb-4">
        <div className="row">

          <aside className="col-lg-4">
            <figure className="gallery-wrap">
              <a href="#" className="img-main-wrap mb-3 h-auto" onClick={(e) => e.preventDefault()}>
                <img
                  src="https://ecommerce-ui.com/uikit/images/items/detail-cloth/big.jpg"
                  className="img-thumbnail w-100 img-contain"
                  style={{ maxHeight: '360px' }}
                  alt="Main Product"
                />
              </a>

              <div className="thumbs-wrap text-center overflow-auto text-nowrap">
                <a href="#" className="item-thumb" onClick={(e) => e.preventDefault()}>
                  <img className="img-thumbnail size-60x60" height="60" src="https://ecommerce-ui.com/uikit/images/items/detail-cloth/thumb1.jpg" alt="Thumb 1" />
                </a>
                <a href="#" className="item-thumb" onClick={(e) => e.preventDefault()}>
                  <img className="img-thumbnail size-60x60" height="60" src="https://ecommerce-ui.com/uikit/images/items/detail-cloth/thumb2.jpg" alt="Thumb 2" />
                </a>
                <a href="#" className="item-thumb" onClick={(e) => e.preventDefault()}>
                  <img className="img-thumbnail size-60x60" height="60" src="https://ecommerce-ui.com/uikit/images/items/detail-cloth/thumb3.jpg" alt="Thumb 3" />
                </a>
                <a href="#" className="item-thumb" onClick={(e) => e.preventDefault()}>
                  <img className="img-thumbnail size-60x60" height="60" src="https://ecommerce-ui.com/uikit/images/items/detail-cloth/thumb1.jpg" alt="Thumb 1" />
                </a>
                <a href="#" className="item-thumb" onClick={(e) => e.preventDefault()}>
                  <img className="img-thumbnail size-60x60" height="60" src="https://ecommerce-ui.com/uikit/images/items/detail-cloth/thumb4.jpg" alt="Thumb 4" />
                </a>
              </div>
            </figure>
          </aside>
          
          <main className="col-lg-5">
            <article>
              <p className="mb-2 text-success">
                <i className="fa fa-check"></i> in Stock
              </p>
              <h4 className="mb-2">Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle</h4>

              <div className="rating-wrap mb-3">
                <ul className="rating-stars">
                  <li style={{ width: '80%' }} className="stars-active">
                    <img src="../images/misc/stars-active.svg" alt="Active Stars" />
                  </li>
                  <li>
                    <img height="520" src="https://ecommerce-ui.com/uikit/images/avatars/company.jpg" alt="Inactive Stars" />
                  </li>
                </ul>
                <b className="label-rating text-warning">4.5</b>
                <i className="dot"></i>
                <span className="label-rating text-muted">
                  <i className="fa fa-comment"></i> 34 reviews
                </span>
                <i className="dot"></i>
                <span className="label-rating text-muted">
                  <i className="fa fa-shopping-basket"></i> 154 sold
                </span>
              </div>

              <div className="d-flex mb-3 p-3 bg-warning-subtle col-lg-9">
                <div className="col">
                  <var className="text-danger h6">$98.00</var>
                  <br />
                  <small>50-100 pcs</small>
                </div>
                <div className="col">
                  <var className="h6">$90.00</var>
                  <br />
                  <small>100-700 pcs</small>
                </div>
                <div className="col">
                  <var className="h6">$82.00</var>
                  <br />
                  <small>700+ pcs</small>
                </div>
              </div>

              <dl className="row">
                <dt className="col-xxl-3 col-lg-4 fw-normal text-muted">Price:</dt>
                <dd className="col-xxl-9 col-lg-8">Negotiable</dd>

                <dt className="col-xxl-3 col-lg-4 fw-normal text-muted">Type:</dt>
                <dd className="col-xxl-9 col-lg-8">Classic style</dd>

                <dt className="col-xxl-3 col-lg-4 fw-normal text-muted">Material:</dt>
                <dd className="col-xxl-9 col-lg-8">Plastic</dd>

                <dt className="col-xxl-3 col-lg-4 fw-normal text-muted">Sizes:</dt>
                <dd className="col-xxl-9 col-lg-8">Small, Medium, Large</dd>
              </dl>

              <hr />
              <dl className="row">
                <dt className="col-xxl-3 col-lg-4 fw-normal text-muted">Customization:</dt>
                <dd className="col-xxl-9 col-lg-8">Customized logo and design custom packages</dd>

                <dt className="col-xxl-3 col-lg-4 fw-normal text-muted">Protection:</dt>
                <dd className="col-xxl-9 col-lg-8">Refund Policy</dd>

                <dt className="col-xxl-3 col-lg-4 fw-normal text-muted">Warranty:</dt>
                <dd className="col-xxl-9 col-lg-8">2 years full warranty</dd>
              </dl>
            </article>
          </main>

          <aside className="col-lg-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <figure className="d-flex">
                  <div className="me-2">
                    <img className="size-48x48 rounded" src="https://ecommerce-ui.com/uikit/images/avatars/company.jpg" alt="Company Logo" />
                  </div>
                  <figcaption>Supplier: <br /> Guanjoi Trading LLC </figcaption>
                </figure>
                <hr />
                <ul className="list-icon">
                  <li>
                    <img className="icon me-2 align-bottom" width="24" src="https://ecommerce-ui.com/uikit/images/flags/flag-tr.png" alt="Turkey Flag" />
                    Istanbul, Turkiye
                  </li>
                  <li>
                    <i className="icon me-2 text-muted fa fa-check-circle"></i> Verified Seller
                  </li>
                  <li>
                    <i className="icon me-2 text-muted fa fa-globe"></i> Worldwide shipping
                  </li>
                </ul>

                <div>
                  <a href="#" className="btn btn-primary w-100 mb-2" onClick={(e) => e.preventDefault()}>
                    Send inquiry
                  </a>
                  <a href="#" className="btn btn-light w-100 mb-2" onClick={(e) => e.preventDefault()}>
                    Seller's profile
                  </a>
                  <a href="#" className="btn btn-light w-100" onClick={(e) => e.preventDefault()}>
                    Add to wishlist
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </div>
    <section>
      <div className="container">
        <div className="row">
          <main className="col-xl-9 col-lg-8">
            <ProductTabs />
          </main>
          <aside className="col-xl-3 col-lg-4">
            <YouMayLike />
          </aside>
        </div>
      </div>
    </section>
    <RelatedProducts/>
    <PromoBanner/>
    <Footer/>
    </div>
  );
};

export default ProductDetail;