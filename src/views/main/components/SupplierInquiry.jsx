import React from "react";
// import bannerImage from '../../../assets/images/banners/bg-warehouse.jpg'; // adjust path if needed

const SupplierInquiry = () => {
  return (
    <section className="py-4">
      <div className="container">
        <article
          className="card bg-primary p-4 p-lg-5 text-white"
          style={{
            backgroundSize: "cover",
            // backgroundImage: `url(${bannerImage})`,
            backgroundPosition: "center",
            borderRadius: "12px",
          }}
        >
          <div className="row align-items-center">
            {/* MOBILE VIEW: ONLY TEXT AND BUTTON */}
            <div className="col-12 d-lg-none text-center">
              <h5>An easy way to send<br />requests to all suppliers</h5>
              <button className="btn btn-light mt-3">Send inquiry</button>
            </div>

            {/* DESKTOP VIEW: TEXT + FORM */}
            <div className="col-lg-5 d-none d-lg-block">
              <h2 className="text-white mb-3">
                An easy way to send requests to all suppliers
              </h2>
              <p className="text-white">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt.
              </p>
            </div>

            <div className="col-lg-5 ms-auto d-none d-lg-block">
              <article className="card card-body">
                <form>
                  <h6 className="mb-3">Send quote to suppliers</h6>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="What item you need?"
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      placeholder="Type more details"
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="mb-3 d-flex" style={{ maxWidth: "250px" }}>
                    <input
                      type="number"
                      className="me-2 form-control"
                      placeholder="Qty"
                    />
                    <select className="form-select">
                      <option value="">Litres</option>
                      <option value="">Kgs</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Send inquiry
                  </button>
                </form>
              </article>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default SupplierInquiry;
