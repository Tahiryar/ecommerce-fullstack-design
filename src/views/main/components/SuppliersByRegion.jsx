import React from "react";
// import bannerImage from "../../../assets/images/banners/bg-warehouse.jpg";

const SupplierInquiry = () => {
  return (
    <section className="pb-4 pt-4">
      <div className="container">
        <article
          className="card bg-primary p-4 p-md-5"
          style={{
            minHeight: "300px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            // backgroundImage: `url(${bannerImage})`,
          }}
        >
          <div className="row align-items-center">
            {/* TEXT SIDE */}
            <div className="col-12 col-lg-6 mb-4 mb-lg-0 text-white">
              <h2 className="mb-3">
                An easy way to send requests to all suppliers
              </h2>
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt.
              </p>
            </div>

            {/* FORM SIDE */}
            <div className="col-12 col-lg-5 ms-lg-auto">
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
