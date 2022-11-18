import { Link } from "react-router-dom";

import "../css/sidebar.css";
// import { close } from '../App;'

export function Sidebar() {
  //
  return (
    <div className=" sidebar bg-dark">
    
      <nav className="navbar-expand-lg  px-3 bg-dark ">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="">
            <i className="bi bi-list text-white"></i>
          </span>
        </button>

        <div className="collapse  navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav  d-flex flex-column">
            <Link className="nav-item " to="/Dashboard/AllUsers">
              <i className="bi bi-people-fill"></i>
            </Link>
          </ul>
        </div>
      </nav>
    </div>
  );
}
