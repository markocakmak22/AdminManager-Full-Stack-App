import React from "react";
import { Link } from "react-router-dom";

const Sidenav: React.FC = () => {
  
  return (
    <div id="layoutSidenav_nav">
      <nav
        className="sb-sidenav accordion sb-sidenav-dark"
        id="sidenavAccordion"
      >
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Managment</div>
            <Link className="nav-link" to="/">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              Dashboard
            </Link>
            <div
              className="collapse"
              id="collapsePages"
              aria-labelledby="headingTwo"
              data-bs-parent="#sidenavAccordion"
            >
              <nav
                className="sb-sidenav-menu-nested nav accordion"
                id="sidenavAccordionPages"
              >
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#pagesCollapseAuth"
                  aria-expanded="false"
                  aria-controls="pagesCollapseAuth"
                >
                  Authentication
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                  </div>
                </a>
                <div
                  className="collapse"
                  id="pagesCollapseAuth"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordionPages"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <a className="nav-link" href="login.html">
                      Login
                    </a>
                    <a className="nav-link" href="register.html">
                      Register
                    </a>
                    <a className="nav-link" href="password.html">
                      Forgot Password
                    </a>
                  </nav>
                </div>
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#pagesCollapseError"
                  aria-expanded="false"
                  aria-controls="pagesCollapseError"
                >
                  Error
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                  </div>
                </a>
                <div
                  className="collapse"
                  id="pagesCollapseError"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordionPages"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <a className="nav-link" href="401.html">
                      401 Page
                    </a>
                    <a className="nav-link" href="404.html">
                      404 Page
                    </a>
                    <a className="nav-link" href="500.html">
                      500 Page
                    </a>
                  </nav>
                </div>
              </nav>
            </div>
            <div style={{ padding: "0px" }} className="sb-sidenav-menu-heading">
              <hr />
            </div>
            <Link className="nav-link" to="/categories">
              <div className="sb-nav-link-icon">
                <i className="fas fa-list"></i>
              </div>
              Categories
            </Link>
            <Link className="nav-link" to="/products">
              <div className="sb-nav-link-icon">
                <i className="fas fa-table"></i>
              </div>
              Products
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidenav;
