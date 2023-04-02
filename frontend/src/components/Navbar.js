import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setAlertAction } from "../actions/alert";
import { logOut } from "../slices/authSlice";

const Navbar = () => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logOut());
    dispatch(setAlertAction("Logout Sucessfully", "red"));
  };

  const guestLinks = (
    <Fragment>
      <div className="flex lg:flex-1">
        <Link to="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <p className="font-extrabold text-3xl">MernShop</p>
        </Link>
      </div>
      <div className="hidden lg:flex lg:gap-x-12"></div>
      <div className="flex flex-1 items-center justify-end gap-x-6">
        <Link
          to="/cart"
          className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 "
        >
          Cart
        </Link>
        <Link
          to="/login"
          className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign in
        </Link>
      </div>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <div className="flex lg:flex-1">
        <Link to="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <p className="font-extrabold text-3xl">MernShop</p>
        </Link>
      </div>
      <div className="hidden lg:flex lg:gap-x-12"></div>
      <div className="flex flex-1 items-center justify-end gap-x-6">
        <Link
          to="/cart"
          className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 "
        >
          Cart
        </Link>
        <button
          onClick={logout}
          className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Logout
        </button>
      </div>
    </Fragment>
  );

  return (
    <header className="bg-gray-900 text-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
        aria-label="Global"
      >
        {!isLoading && isAuthenticated ? authLinks : guestLinks}
      </nav>
    </header>
  );
};

export default Navbar;
