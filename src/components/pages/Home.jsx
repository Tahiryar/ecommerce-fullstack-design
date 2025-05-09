import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const products = [
    {
      id: 1,
      name: "Premium Cotton T-Shirt",
      price: 49.99,
      image: "https://bechlo.pk/cdn/shop/products/k27srGOdZS.jpg?v=1708628913",
      rating: 4.5
    },
    {
      id: 2,
      name: "Classic Denim Jeans",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      rating: 4
    },
    {
      id: 3,
      name: "Leather Wallet",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      rating: 5
    },
    {
      id: 4,
      name: "Running Shoes",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      rating: 3.5
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<i key={i} className="bi bi-star-half text-warning"></i>);
      } else {
        stars.push(<i key={i} className="bi bi-star text-warning"></i>);
      }
    }

    return <div>{stars}</div>;
  };

  return (
    <div className="ecommerce-home">
      {/* Hero Banner */}
      <div className="hero-banner position-relative mb-5">
        <img 
          src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
          alt="Fashion Sale" 
          className="img-fluid w-100"
          style={{ height: "600px", objectFit: "cover" }}
        />
        <div className="hero-content position-absolute top-50 start-0 translate-middle-y ps-5 text-white">
          <h1 className="display-3 fw-bold mb-3">SUMMER COLLECTION</h1>
          <p className="fs-4 mb-4">Discover our new arrivals for this season</p>
          <Link to="/products" className="btn btn-outline-light btn-lg px-4 py-2 fs-5 fw-bold">SHOP NOW</Link>
        </div>
      </div>

      {/* Categories */}
      <div className="container mb-5">
        <h2 className="text-center mb-4 fw-bold">SHOP BY CATEGORY</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="position-relative rounded overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                className="img-fluid w-100"
                style={{ height: "300px", objectFit: "cover" }}
                alt="Men"
              />
              <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                <Link to="/products?category=men" className="btn btn-outline-light btn-lg">MEN</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="position-relative rounded overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                className="img-fluid w-100"
                style={{ height: "300px", objectFit: "cover" }}
                alt="Women"
              />
              <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                <Link to="/products?category=women" className="btn btn-outline-light btn-lg">WOMEN</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="position-relative rounded overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                className="img-fluid w-100"
                style={{ height: "300px", objectFit: "cover" }}
                alt="Accessories"
              />
              <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                <Link to="/products?category=accessories" className="btn btn-outline-light btn-lg">ACCESSORIES</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="container mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">FEATURED PRODUCTS</h2>
          <Link to="/products" className="text-decoration-none text-dark fw-bold">VIEW ALL</Link>
        </div>
        <div className="row g-4">
          {products.map(product => (
            <div className="col-md-3" key={product.id}>
              <div className="product-card border-0 shadow-sm h-100 p-2 rounded">
                <div className="position-relative mb-3 rounded overflow-hidden">
                  <Link to={`/product/${product.id}`}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="img-fluid w-100"
                      style={{ height: "300px", objectFit: "cover" }}
                    />
                  </Link>
                  <div className="position-absolute bottom-0 start-0 w-100 d-flex justify-content-center p-2 bg-white bg-opacity-75">
                    <button className="btn btn-outline-secondary btn-sm rounded-pill mx-1">
                      <i className="bi bi-heart"></i>
                    </button>
                    <Link to={`/product/${product.id}`} className="btn btn-outline-secondary btn-sm rounded-pill mx-1">
                      <i className="bi bi-eye"></i>
                    </Link>
                    <Link to="/cart" className="btn btn-outline-primary btn-sm rounded-pill mx-1">
                      <i className="bi bi-cart-plus"></i> Add to Cart
                    </Link>
                  </div>
                </div>
                <div className="product-info">
                  <h5 className="mb-1">
                    <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
                      {product.name}
                    </Link>
                  </h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">${product.price.toFixed(2)}</span>
                    {renderStars(product.rating)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Banner */}
      <div className="container mb-5">
        <div className="promo-banner bg-dark text-white p-5 rounded">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="fw-bold mb-3">SUMMER SALE</h2>
              <p className="mb-4">Up to 50% off on selected items. Limited time offer!</p>
              <Link to="/products?discount=true" className="btn btn-outline-light fw-bold">SHOP THE SALE</Link>
            </div>
            <div className="col-md-6 text-end">
              <img 
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Summer Sale" 
                className="img-fluid rounded"
                style={{ maxHeight: "200px" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="container mb-5">
        <div className="bg-light p-5 rounded text-center">
          <h2 className="fw-bold mb-3">JOIN OUR NEWSLETTER</h2>
          <p className="mb-4">Subscribe to get updates on new arrivals and special offers</p>
          <div className="d-flex justify-content-center">
            <input 
              type="email" 
              className="form-control w-50 me-2" 
              placeholder="Your email address" 
            />
            <button className="btn btn-dark fw-bold">SUBSCRIBE</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
