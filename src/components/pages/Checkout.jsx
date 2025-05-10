import React from 'react';

const Checkout = () => {
  const cartItems = [
    {
      id: 1,
      image: 'https://via.placeholder.com/80',
      title: 'T-shirts with multiple colors, for men and lady',
      price: 78.99,
      quantity: 9,
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/80',
      title: 'T-shirts with multiple colors, for men and lady',
      price: 39.0,
      quantity: 3,
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/80',
      title: 'T-shirts with multiple colors, for men and lady',
      price: 170.5,
      quantity: 1,
    },
  ];

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Checkout</h2>

      <div className="row">
        {/* Left side: cart items */}
        <div className="col-md-8">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="d-flex mb-3 p-3 border rounded align-items-center justify-content-between flex-wrap"
            >
              <div className="d-flex">
                <img src={item.image} alt={item.title} width="80" height="80" className="me-3" />
                <div>
                  <h6>{item.title}</h6>
                  <p className="mb-0">Quantity: {item.quantity}</p>
                </div>
              </div>
              <div className="fw-bold">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>

        {/* Right side: summary */}
        <div className="col-md-4">
          <div className="border rounded p-3 bg-light">
            <h5 className="mb-3">Order Summary</h5>
            {cartItems.map((item) => (
              <div key={item.id} className="d-flex justify-content-between mb-2">
                <span>
                  {item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <span>Total:</span>
              <span>${calculateTotal()}</span>
            </div>
            <button className="btn btn-success w-100 mt-3">Proceed to Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
