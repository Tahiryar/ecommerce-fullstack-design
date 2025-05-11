import React from 'react';

const products = [
  { id: 1, img: 'https://ecommerce-ui.com/uikit/images/items/interior/1.jpg', name: 'Original Product Name', price: '$32.00-$40.00' },
  { id: 2, img: 'https://ecommerce-ui.com/uikit/images/items/interior/2.jpg', name: 'Jeans Backpack Small', price: '$32.00-$40.00' },
  { id: 3, img: 'https://ecommerce-ui.com/uikit/images/items/interior/3.jpg', name: 'Mens Jeans Short Blue', price: '$32.00-$40.00' },
  { id: 4, img: 'https://ecommerce-ui.com/uikit/images/items/interior/4.jpg', name: 'Electric Kettle 200 Watt', price: '$32.00-$40.00' },
  { id: 5, img: 'https://ecommerce-ui.com/uikit/images/items/interior/5.jpg', name: 'Headset for Office', price: '$32.00-$40.00' },
];

const RelatedProducts = () => {
  return (
    <div className="container">
      <article className="card p-3 mb-4">
        <h5 className="card-title mb-4">Related products</h5>
        <div className="d-flex overflow-auto gap-3 flex-nowrap">
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0" style={{ width: '238px' }}>  
              <figure className="card-product-grid product-sm">
                <a
                  href="#"
                  className="img-wrap border rounded d-block"
                  onClick={(e) => e.preventDefault()}
                  style={{  height: 'auto' }}
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    className="img-fluid"
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                  />
                </a>
                <figcaption className="mt-2">
                  <a
                    href="#"
                    className="title d-block text-decoration-none"
                    onClick={(e) => e.preventDefault()}
                  >
                    {product.name}
                  </a>
                  <p className="mt-1 text-muted">{product.price}</p>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
};

export default RelatedProducts;
