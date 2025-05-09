import React from 'react';

const products = [
  { id: 1, img: 'images/items/cloth/6.jpg', name: 'Original Product Name', price: '$32.00-$40.00' },
  { id: 2, img: 'images/items/cloth/5.jpg', name: 'Jeans Backpack Small', price: '$32.00-$40.00' },
  { id: 3, img: 'images/items/cloth/4.jpg', name: 'Mens Jeans Short Blue', price: '$32.00-$40.00' },
  { id: 4, img: 'images/items/tech/10.jpg', name: 'Electric Kettle 200 Watt', price: '$32.00-$40.00' },
  { id: 5, img: 'images/items/interior/3.jpg', name: 'Headset for Office', price: '$32.00-$40.00' },
  { id: 6, img: 'images/items/interior/1.jpg', name: 'Soft Chair for Office', price: '$32.00-$40.00' },
];

const RelatedProducts = () => {
  return (
    <div className="container">
      <article className="card p-3 mb-4">
        <h5 className="card-title">Related products</h5>
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-xxl-2 col-xl-3 col-sm-4 col-6">
              <figure className="card-product-grid product-sm">
                <a href="#" className="img-wrap border rounded" onClick={(e) => e.preventDefault()}>
                  <img src={product.img} alt={product.name} />
                </a>
                <figcaption className="mt-2">
                  <a href="#" className="title" onClick={(e) => e.preventDefault()}>{product.name}</a>
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