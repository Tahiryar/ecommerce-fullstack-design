import React from 'react';
const suppliers = [
  { country: "Arabic Emirates", domain: "shopname.ae", code: "ae" },
  { country: "Australia", domain: "shopname.ae", code: "au" },
  { country: "United States", domain: "shopname.ae", code: "us" },
  { country: "Russia", domain: "shopname.ru", code: "ru" },
  { country: "Italy", domain: "shopname.it", code: "it" },
  { country: "Denmark", domain: "denmark.com.dk", code: "dk" },
  { country: "France", domain: "shopname.com.fr", code: "fr" },
  { country: "Arabic Emirates", domain: "shopname.ae", code: "ae" },

];

export default function SuppliersByRegion() {
  return (
    <div className="container py-4">
      <h4 className="mb-4">Suppliers by region</h4>
      <div className="row">
        {suppliers.map((supplier, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-3 mb-3 d-flex align-items-start">
            <img
              src={`https://flagcdn.com/w40/${supplier.code}.png`}
              alt={supplier.country}
              width="30"
              height="20"
              className="me-2 mt-1"
            />
            <div>
              <div className="fw-bold">{supplier.country}</div>
              <div className="text-muted" style={{ fontSize: '0.9rem' }}>{supplier.domain}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}