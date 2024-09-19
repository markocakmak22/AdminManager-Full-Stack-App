import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  
  useEffect(() => {
    const sidebarToggle = document.querySelector("#sidebarToggle");
    if (sidebarToggle) {
      if (localStorage.getItem("sb|sidebar-toggle") === "true") {
        document.body.classList.toggle("sb-sidenav-toggled");
      }

      const handleToggleClick = (event: Event) => {
        event.preventDefault();
        document.body.classList.toggle("sb-sidenav-toggled");
        localStorage.setItem(
          "sb|sidebar-toggle",
          document.body.classList.contains("sb-sidenav-toggled").toString()
        );
      };

      sidebarToggle.addEventListener("click", handleToggleClick);

      return () => {
        sidebarToggle.removeEventListener("click", handleToggleClick);
      };
    }
  }, []);

  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <Link className="navbar-brand ps-3" to="/">
        Admin Panel
      </Link>
      <button
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
      >
        <i className="fas fa-bars"></i>
      </button>
    </nav>
  );
};

export default Navbar;
