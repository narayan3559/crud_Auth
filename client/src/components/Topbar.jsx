import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate()
  const auth= localStorage.getItem("userdata")
  useEffect(() => {
}, [auth])

  const logout = async () => {
    localStorage.removeItem('userdata');
    navigate('/')
  };

  return (
    <div className="Topbar">
      <div>
        <ul className="nav_ul2">
          <li>
            <Link to="/">Home</Link>
          </li>
          {auth ? (
            <>
              <li>
                <Link to="/fetch">View</Link>
              </li>
              <li>
                <Link to="/update">Edit</Link>
              </li>
              <li>
                <Link to="/delete">Delete</Link>
              </li>
              <li>
                <Link to="/changePassword">Change Password</Link>
              </li>
            </>
          ) : null}
        </ul>
      </div>
      <div>
        <ul className="nav_ul2">
          {!auth ? (
            <>
              <li>
                <Link to={"/signup"}>Sign Up</Link>
              </li>
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
            </>
          ) : (
            <li>
              <Link onClick={() => logout()} to={"/"}>
                Logout
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Topbar;
