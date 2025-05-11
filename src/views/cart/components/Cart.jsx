import React from 'react';
import CartItem from './CartItem';

const Cart = () => (
  <div className="card mb-4">
    <div className="card-body p-lg-4">
      <h4 className="card-title mb-4">Shopping cart</h4>
      
      <CartItem
        img="https://ecommerce-ui.com/uikit/images/items/cloth/4.jpg"
        title="Jeans Short for Men Original"
        details="Size: medium, Color: blue, Material: Plastic. Seller: Artel Market"
        price="$78.99"
      />
      <hr />
      <CartItem
        img="https://ecommerce-ui.com/uikit/images/items/cloth/1.jpg"
        title="Semir Short Sleeve Men T-Shirt Cotton"
        details="Size: XXL, Color: Lightblue. Seller: Adidas"
        price="$12.00"
      />
      <hr />
      <CartItem
        img="https://ecommerce-ui.com/uikit/images/items/tech/4.jpg"
        title="Smart phone Apple iPhone 11"
        details="128GB, Color: black. Seller: Apple Inc"
        price="$970.99"
      />
      <hr />
      <a className="btn btn-light" href="/uikit/p-market-index" onClick={(e) => { e.preventDefault(); window.history.back(); }}>
        <i className="fa fa-arrow-left me-2"></i> Back to shop
      </a>
    </div>
  </div>
);

export default Cart;