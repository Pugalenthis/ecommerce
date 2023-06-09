import React from "react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById } from "../actions/order-action";
import useFetch from "../hooks/useFetchHooks";
import Spinner from "./Spinner";
import { markAsDeliveredAction } from "../actions/order-action";

const AdminOrderView = () => {
  const { order_id } = useParams();

  console.log("order_id", order_id);

  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:4000/api/orders/${order_id}`
  );

  console.log("loading", loading);
  console.log("error", error);

  console.log("data in AdminOrderView", data);
  console.log("loading in AdminOrderView", loading);

  const dispatch = useDispatch();
  const markAsDelivered = () => {
    const updateDeliveryStatusData = {
      isDelivered: true,
      deliveredAt: new Date().toISOString(),
    };
    dispatch(
      markAsDeliveredAction(data.razporpayOrderId, updateDeliveryStatusData)
    );
  };
  return (
    <Fragment>
      {loading && <Spinner />}
      {!loading && data && (
        <div className="bg-gray-50 min-h-screen">
          <div className="mx-auto max-w-2xl pt-16 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="space-y-2 px-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0">
              <div className="flex sm:items-baseline sm:space-x-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Order {data._id}
                </h1>
                <a
                  href="#"
                  className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:block"
                >
                  View invoice
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </div>
              <p className="text-sm text-gray-600">
                Order placed{" "}
                <time
                  datetime="2021-03-22"
                  className="font-medium text-gray-900"
                >
                  {data.createdAt}
                </time>
              </p>
              <a
                href="#"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:hidden"
              >
                View invoice
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
            <div className="flex justify-between my-10">
              <div className="text-xl font-bold mr-4">
                <span className="mr-2">paid</span>
                <span>
                  {data.isPaid ? (
                    <i class="fa-solid fa-check text-green-600 text-xl"></i>
                  ) : (
                    <i class="fa-solid fa-xmark text-red-600 text-xl"></i>
                  )}
                </span>
              </div>
              <div className="text-xl font-bold mr-4">
                <span className="mr-2">Delivered</span>
                <span>
                  {data.isDelivered ? (
                    <i class="fa-solid fa-check text-green-600 text-xl"></i>
                  ) : (
                    <i class="fa-solid fa-xmark text-red-600 text-xl"></i>
                  )}
                </span>
              </div>
              {!data.isDelivered && (
                <button
                  disabled={data.isDelivered}
                  onClick={markAsDelivered}
                  to="/payment"
                  className=" rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 inline-block w-80 "
                >
                  Mark as Delivered
                </button>
              )}
            </div>
            <div className="mt-6">
              <h2 className="sr-only">Products purchased</h2>
              <div className="space-y-8">
                {data.orderItems.map((orderItem) => {
                  return (
                    <div className="border-t border-b border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
                      <div className="py-6 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                        <div className="sm:flex lg:col-span-7">
                          <div className="aspect-w-1 aspect-h-1 w-full flex-shrink-0 overflow-hidden rounded-lg sm:aspect-none sm:h-40 sm:w-40">
                            <img
                              src={orderItem.image}
                              alt="Arm modeling wristwatch with black leather band, white watch face, thin watch hands, and fine time markings."
                              className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                            />
                          </div>
                          <div className="mt-6 sm:mt-0 sm:ml-6">
                            <h3 className="text-base font-medium text-gray-900">
                              <a href="#">{orderItem.name}</a>
                            </h3>
                            <p className="mt-2 text-sm font-medium text-gray-900">
                              ${orderItem.price * orderItem.qty}
                            </p>
                            <p className="mt-3 text-sm text-gray-500">
                              This contemporary wristwatch has a clean,
                              minimalist look and high quality components.
                            </p>
                          </div>
                        </div>
                        <div className="mt-6 lg:col-span-5 lg:mt-0">
                          <dl className="grid grid-cols-2 gap-x-6 text-sm">
                            <div>
                              <dt className="font-medium text-gray-900">
                                Delivery address
                              </dt>
                              <dd className="mt-3 text-gray-500">
                                <span className="block">
                                  {data.shippingAddress.address}
                                </span>
                                <span className="block">
                                  {data.shippingAddress.city},
                                  {data.shippingAddress.postalCode}
                                </span>
                                <span className="block">
                                  {data.shippingAddress.country}
                                </span>
                              </dd>
                            </div>
                            <div>
                              <dt className="font-medium text-gray-900">
                                Shipping updates
                              </dt>
                              <dd className="mt-3 space-y-3 text-gray-500">
                                <p>f•••@example.com</p>
                                <p>1•••••••••40</p>
                                <button
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Edit
                                </button>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 py-6 px-4 sm:px-6 lg:p-8">
                        <h4 className="sr-only">Status</h4>
                        <p className="text-sm font-medium text-gray-900">
                          Shipped on{" "}
                          <time datetime="2021-03-23">March 23, 2021</time>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-16">
              <h2 className="sr-only">Billing Summary</h2>
              <div className="bg-gray-100 py-6 px-4 sm:rounded-lg sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-8">
                <dl className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-7">
                  <div>
                    <dt className="font-medium text-gray-900">
                      Billing address
                    </dt>
                    <dd className="mt-3 text-gray-500">
                      <span className="block">
                        {data.shippingAddress.address}
                      </span>
                      <span className="block">
                        {data.shippingAddress.city},
                        {data.shippingAddress.postalCode}
                      </span>
                      <span className="block">
                        {data.shippingAddress.country}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-900">
                      Payment information
                    </dt>
                    <dd className="-ml-4 -mt-1 flex flex-wrap">
                      <div className="ml-4 mt-4 flex-shrink-0">
                        <svg
                          aria-hidden="true"
                          width="36"
                          height="24"
                          viewBox="0 0 36 24"
                          className="h-6 w-auto"
                        >
                          <rect width="36" height="24" rx="4" fill="#224DBA" />
                          <path
                            d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                            fill="#fff"
                          />
                        </svg>
                        <p className="sr-only">Visa</p>
                      </div>
                      <div className="ml-4 mt-4">
                        <p className="text-gray-900">Ending with 4242</p>
                        <p className="text-gray-600">Expires 02 / 24</p>
                      </div>
                    </dd>
                  </div>
                </dl>
                <dl className="mt-8 divide-y divide-gray-200 text-sm lg:col-span-5 lg:mt-0">
                  <div className="flex items-center justify-between pb-4">
                    <dt className="text-gray-600">Subtotal</dt>
                    <dd className="font-medium text-gray-900">$72</dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-gray-600">Shipping</dt>
                    <dd className="font-medium text-gray-900">$5</dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-gray-600">Tax</dt>
                    <dd className="font-medium text-gray-900">$6.16</dd>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <dt className="font-medium text-gray-900">Order total</dt>
                    <dd className="font-medium text-indigo-600">
                      ${data.totalPrice}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AdminOrderView;
