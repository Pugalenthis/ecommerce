import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../actions/orders-action";
import Spinner from "./Spinner";

const OrdersList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const { isLoading, allOrders } = useSelector((state) => state.orders);

  console.log("products", allOrders);

  let content = [];

  if (isLoading) {
    content = <Spinner />;
  }

  if (!allOrders && !isLoading) {
    content = <h1>NO ORDERS</h1>;
  }

  if (allOrders) {
    allOrders.map((order) => {
      console.log("user", order);
      content.push(
        <tr>
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
            {order._id}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {order.user}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            ${order.createdAt}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {order.totalPrice}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {order.isPaid ? (
              <i class="fa-solid fa-check text-green-600 text-xl"></i>
            ) : (
              <i class="fa-solid fa-xmark text-red-600 text-xl"></i>
            )}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {order.isDelivered ? "Delivered" : "Not Delivered"}
          </td>
          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
            <Link
              to={`/order/${order._id}`}
              type="button"
              className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Details
            </Link>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="mx-auto  max-w-7xl items-center justify-between gap-x-6 p-6lg:px-8 my-10">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Orders
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the orders in your account including their ID, total,
            paid and delivered.
          </p>
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
                    USER
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    DATE
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    TOTAL
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    PAID
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    DELIVERY STATUS
                  </th>
                  <th
                    scope="col"
                    className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                  ></th>
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

export default OrdersList;
