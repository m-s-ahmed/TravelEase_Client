import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";
import useTheme from "../../hooks/useTheme";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();

  const handleSignOut = () => {
    signOutUser()
      .then(() => toast.success("Logged Out Successfully"))
      .catch((error) => toast.error(error.message));
  };

  const navClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg font-medium transition ${
      isActive ? "bg-primary text-primary-content" : "hover:bg-base-200"
    }`;

  const links = (
    <>
      <li>
        <NavLink className={navClass} to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className={navClass} to="/allvehicles">
          All Vehicles
        </NavLink>
      </li>
      <li>
        <NavLink className={navClass} to="/addvehicles">
          Add Vehicles
        </NavLink>
      </li>
      <li>
        <NavLink className={navClass} to="/myvehicles">
          My Vehicles
        </NavLink>
      </li>
      <li>
        <NavLink className={navClass} to="/mybookings">
          My Bookings
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50">
      <div className="navbar bg-base-100/80 backdrop-blur border-b border-base-200">
        {/* Left */}
        <div className="navbar-start">
          {/* Mobile dropdown */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-56 rounded-2xl bg-base-100 p-2 shadow-lg border border-base-200"
            >
              {links}
            </ul>
          </div>

          {/* Logo */}
          <Link
            to="/"
            className="btn btn-ghost text-xl font-extrabold tracking-tight"
          >
            Travel<span className="text-primary">Ease</span>
          </Link>
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1">{links}</ul>
        </div>

        {/* Right */}
        <div className="navbar-end gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === "light" ? (
              // moon icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21.64 13a1 1 0 0 0-1.05-.14A8.05 8.05 0 0 1 17.22 14a8 8 0 0 1-7.22-11.4 1 1 0 0 0-1.19-1.36A10 10 0 1 0 22 14.19a1 1 0 0 0-.36-1.19z" />
              </svg>
            ) : (
              // sun icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-16a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 18a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1zM4.22 5.64a1 1 0 0 1 1.41 0l.7.7a1 1 0 1 1-1.41 1.41l-.7-.7a1 1 0 0 1 0-1.41zm13.45 13.45a1 1 0 0 1 1.41 0l.7.7a1 1 0 0 1-1.41 1.41l-.7-.7a1 1 0 0 1 0-1.41zM2 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1zm18 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1zM5.64 19.78a1 1 0 0 1 0-1.41l.7-.7a1 1 0 1 1 1.41 1.41l-.7.7a1 1 0 0 1-1.41 0zm13.45-13.45a1 1 0 0 1 0-1.41l.7-.7a1 1 0 1 1 1.41 1.41l-.7.7a1 1 0 0 1-1.41 0z" />
              </svg>
            )}
          </button>

          {user ? (
            <>
              <div
                className="tooltip tooltip-bottom"
                data-tip={user.displayName || "User"}
              >
                <div className="avatar">
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={
                        user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"
                      }
                      alt="User"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                className="btn btn-outline btn-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
