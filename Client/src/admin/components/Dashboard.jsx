import { useState } from "react";

import ProductsTable from "./products/ProductsTable";
import CreatePoductForm from "./products/CreateProduct";
import '../../admin/css/app.css'

export const Dashboard = () => {
  const [tally, setTally] = useState("45%");
  return (
    <div className=" w-full">
      {/* <!-- content --> */}
      <div class="content ">

        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col-lg-7 col-md-12">
            <div class="card widget h-100">
              <div class="card-header d-flex">
                <h6 class="card-title">
                  Sales Chart
                  <a href="#" class="bi bi-question-circle ms-1 small" data-bs-toggle="tooltip"
                    title="Daily orders and sales"></a>
                </h6>
                <div class="d-flex gap-3 align-items-center ms-auto">
                  <div class="dropdown">
                    <a href="#" data-bs-toggle="dropdown" class="btn btn-sm" aria-haspopup="true"
                      aria-expanded="false">
                      <i class="bi bi-three-dots"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-end">
                      <a href="#" class="dropdown-item">View Detail</a>
                      <a href="#" class="dropdown-item">Download</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="d-md-flex align-items-center mb-3">
                  <div class="d-flex align-items-center">
                    <div class="display-7 me-3">
                      <i class="bi bi-bag-check me-2 text-success"></i> $10.552,40
                    </div>
                    <span class="text-success">
                      <i class="bi bi-arrow-up me-1 small"></i>8.30%
                    </span>
                  </div>
                  <div class="d-flex gap-4 align-items-center ms-auto mt-3 mt-lg-0">
                    <select class="form-select">
                      <optgroup label="2020">
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                      </optgroup>
                      <optgroup label="2021">
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May" selected>May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                      </optgroup>
                    </select>
                  </div>
                </div>
                <div id="sales-chart"></div>
                <div class="d-flex justify-content-center gap-4 align-items-center ms-auto mt-3 mt-lg-0">
                  <div>
                    <i class="bi bi-circle-fill mr-2 text-primary me-1 small"></i>
                    <span>Sales</span>
                  </div>
                  <div>
                    <i class="bi bi-circle-fill mr-2 text-success me-1 small"></i>
                    <span>Order</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-12">
            <div class="card h-100">
              <div class="card-body">
                <div class="d-flex mb-3">
                  <div class="display-7">
                    <i class="bi bi-basket"></i>
                  </div>
                  <div class="dropdown ms-auto">
                    <a href="#" data-bs-toggle="dropdown" class="btn btn-sm" aria-haspopup="true"
                      aria-expanded="false">
                      <i class="bi bi-three-dots"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-end">
                      <a href="#" class="dropdown-item">View Detail</a>
                      <a href="#" class="dropdown-item">Download</a>
                    </div>
                  </div>
                </div>
                <h4 class="mb-3">Orders</h4>
                <div class="d-flex mb-3">
                  <div class="display-7">310</div>
                  <div class="ms-auto" id="total-orders"></div>
                </div>

              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-12">
            <div class="card h-100">
              <div class="card-body">
                <div class="d-flex mb-3">
                  <div class="display-7">
                    <i class="bi bi-credit-card-2-front"></i>
                  </div>
                  <div class="dropdown ms-auto">
                    <a href="#" data-bs-toggle="dropdown" class="btn btn-sm" aria-haspopup="true"
                      aria-expanded="false">
                      <i class="bi bi-three-dots"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-end">
                      <a href="#" class="dropdown-item">View Detail</a>
                      <a href="#" class="dropdown-item">Download</a>
                    </div>
                  </div>
                </div>
                <h4 class="mb-3">Sales</h4>
                <div class="d-flex mb-3">
                  <div class="display-7">$3.759,00</div>
                  <div class="ms-auto" id="total-sales"></div>
                </div>
                <div class="text-danger">
                  Over last month 2.4% <i class="small bi bi-arrow-down"></i>
                </div>
              </div>
            </div>
          </div>


          <div class="col-lg-4 col-md-6">
            <div class="card h-100 bg-purple">
              <div class="card-body text-center">
                <div class="text-white-50">
                  <div class="bi bi-box-seam display-6 mb-3"></div>
                  <div class="display-8 mb-2">Products Sold</div>
                  <h5>89 Sold</h5>
                </div>
                <div id="products-sold"></div>
              </div>
            </div>
          </div>

          <div class="col-lg-5 col-md-12">
            <div class="card widget">
              <div class="card-header">
                <h5 class="card-title">Activity Overview</h5>
              </div>
              <div class="row g-4">
                <div class="col-md-6">
                  <div class="card border-0">
                    <div class="card-body text-center">
                      <div class="display-5">
                        <i class="bi bi-truck text-secondary"></i>
                      </div>
                      <h5 class="my-3">Delivered</h5>
                      <div class="text-muted">15 New Packages</div>
                      <div class="progress mt-3" style={{ height: "5px" }}>
                        <div class="progress-bar bg-secondary" role="progressbar" style={{ width: "25%" }}
                          aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="card border-0">
                    <div class="card-body text-center">
                      <div class="display-5">
                        <i class="bi bi-receipt text-warning"></i>
                      </div>
                      <h5 class="my-3">Ordered</h5>
                      <div class="text-muted">72 New Items</div>
                      <div class="progress mt-3" style={{ height: "5px" }}>
                        <div class="progress-bar bg-warning" role="progressbar" style={{ width: "67%" }}
                          aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="card border-0">
                    <div class="card-body text-center">
                      <div class="display-5">
                        <i class="bi bi-bar-chart text-info"></i>
                      </div>
                      <h5 class="my-3">Reported</h5>
                      <div class="text-muted">50 Support New Cases</div>
                      <div class="progress mt-3" style={{ height: "5px" }}>
                        <div class="progress-bar bg-info" role="progressbar" style={{ width: "80%" }}
                          aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="card border-0">
                    <div class="card-body text-center">
                      <div class="display-5">
                        <i class="bi bi-cursor text-success"></i>
                      </div>
                      <h5 class="my-3">Arrived</h5>
                      <div class="text-muted">34 Upgraded Boxed</div>
                      <div class="progress mt-3" style={{ height: "5px" }}>
                        <div class="progress-bar bg-success" role="progressbar" style={{ width: "55%" }}
                          aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
      {/* <!-- ./ content --> */}

      <div className="p-4">
        {/* <ProductsTable /> */}
        {/* <CreatePoductForm /> */}
      </div>
    </div>

  );
};
