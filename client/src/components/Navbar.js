import React, { Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setAlertAction } from "../actions/alert";
import { getProducts } from "../actions/product-action";
import { logOut } from "../slices/authSlice";

const Navbar = () => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const searchInputRef = useRef("");

  const logout = () => {
    dispatch(logOut());
    dispatch(setAlertAction("Logout Sucessfully", "red"));
  };

  const { products, page, pages } = useSelector((state) => state.product);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getProducts(searchInputRef.current.value));
    searchInputRef.current.value = "";
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

      <form class="flex items-center" onSubmit={searchSubmitHandler}>
        <label for="simple-search" class="sr-only">
          Search
        </label>
        <div class="relative w-full">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            ref={searchInputRef}
            id="simple-search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required
          />
        </div>
        <button
          type="submit"
          class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <span class="sr-only">Search</span>
        </button>
      </form>

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
