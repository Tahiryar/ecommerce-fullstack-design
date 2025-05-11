import React from 'react';

const features = [
  { icon: 'lock', title: 'Secure Payment' },
  { icon: 'phone', title: 'Customer Support' },
  { icon: 'truck', title: 'Free Delivery' },
  { icon: 'truck', title: 'Free Delivery' }
];

const Features = () => (
  <article className="rounded p-5 bg-gray-light">
    <div className="row">
      {features.map((feature, idx) => (
        <div className="col-md-3" key={idx}>
          <figure className="d-flex align-items-center">
            <span className="icon me-3 rounded-circle size-48x48 bg-secondary-subtle">
              <i className={`fa fa-${feature.icon} fa-lg`}></i>
            </span>
            <figcaption>
              {feature.title}
              <p className="mb-0 text-muted">Have you ever finally just</p>
            </figcaption>
          </figure>
        </div>
      ))}
    </div>
  </article>
);

export default Features;