import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./index.css";
interface Props {
  variant?: "white" | "black";
}

import { useNavigate } from "react-router-dom";
const Navbar: React.FC<Props> = ({ variant }) => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  return (
    <>
      <nav>
        <ul>
          <li>
            <h1
              style={{
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              TRACX
            </h1>
          </li>
          {accessToken && (
            <li>
              <NavLink
                to="/student"
                className={`pointer mx-4 ${
                  variant === "white" ? "nav__link__white" : "nav__link"
                }`}
              >
                Student
              </NavLink>
            </li>
          )}

          <div style={{ float: "right" }}>
            {!accessToken && (
              <>
                <Link to="/login" className="mx-3">
                  <button type="button">
                    <span className="p-3">Login</span>
                  </button>
                </Link>
                <Link to="/register" className="mx-3">
                  <button type="button">
                    <span className="p-2">Register</span>
                  </button>
                </Link>
              </>
            )}
            {accessToken && (
              <button
                type="button"
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
              >
                <span className="p-3">Logout</span>
              </button>
            )}
          </div>
        </ul>
      </nav>
    </>
  );
};

export default React.memo(Navbar);
