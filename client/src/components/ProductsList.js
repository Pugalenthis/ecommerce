import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../actions/admin-action";
import Spinner from "./Spinner";

const ProductsList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const { isLoading, products } = useSelector((state) => state.admin);

  console.log("products in productList", products);

  let content = [];

  if (isLoading) {
    content = <Spinner />;
  }

  if (!products && !isLoading) {
    content = <h1>NO PRODUCTS</h1>;
  }

  if (products) {
    products.map((product) => {
      console.log("user", product);
      content.push(
        <tr>
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
            {product._id}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {product.name}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            ${product.price}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {product.category}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {product.brand}
          </td>
          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
            <a href="#" className="text-indigo-600 hover:text-indigo-900">
              Edit<span className="sr-only">, </span>
            </a>
            <a href="#" className="text-red-600 hover:text-red-900 ml-2">
              Delete<span className="sr-only">, </span>
            </a>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="mx-auto  max-w-7xl items-center justify-between gap-x-6 p-6lg:px-8 my-10 min-h-screen">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Products
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the products in your account including their name,
            price, category and brand.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            to="/createproduct"
            type="button"
            className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add product
          </Link>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    NAME
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    PRICE
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    CATEGORY
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    BRAND
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">
                      <i class="fa-solid fa-pen-to-square"></i>
                    </span>
                    <span className="sr-only ml-2 text-red-700">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">{content}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
