import React, { Fragment, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { getProduct } from "../actions/product-action";
import Spinner from "./Spinner";
import { addItemToCart } from "../slices/cartSlice";

const ViewProduct = () => {
  const { id } = useParams();
  const qtyInputRef = useRef(1);
  console.log("qtyInputRef", qtyInputRef.current.value);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct(id));
  }, []);

  const { isLoading, product } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);

  const addItemtoCartHandler = () => {
    dispatch(addItemToCart({ ...product, qty: +qtyInputRef.current.value }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("useQtyRef", qtyInputRef.current.value);
  };

  const createStockDropdownvalues = (n) => {
    const values = [];
    for (let i = 1; i <= n; i++) {
      values.push(<option value={i}>{i}</option>);
    }
    return values;
  };

  return (
    <Fragment>
      {!isLoading && product ? (
        <div className="bg-white">
          <div className="pt-6 pb-16 sm:pb-24">
            <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
                <div className="lg:col-span-5 lg:col-start-8">
                  <div className="flex justify-between">
                    <h1 className="text-xl font-medium text-gray-900">
                      {product.name}
                    </h1>
                    <p className="text-xl font-medium text-gray-900">
                      ${product.price}
                    </p>
                  </div>
                  <div className="mt-4">
                    <h2 className="sr-only">Reviews</h2>
                    <div className="flex items-center">
                      <p className="text-sm text-gray-700">
                        {product.rating}
                        <span className="sr-only"> out of 5 stars</span>
                      </p>
                      <div className="ml-1 flex items-center">
                        <svg
                          className="text-yellow-400 h-5 w-5 flex-shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div
                        aria-hidden="true"
                        className="ml-4 text-sm text-gray-300"
                      >
                        ·
                      </div>
                      <div className="ml-4 flex">
                        <a
                          href="#"
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          See all {product.reviews.length} reviews
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                  <h2 className="sr-only">Images</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                    <img
                      src={`${product.image}`}
                      alt="Back of women&#039;s Basic Tee in black."
                      className="lg:col-span-2 lg:row-span-2 rounded-lg"
                    />
                    <img
                      src={`${product.image}`}
                      alt="Side profile of women&#039;s Basic Tee in black."
                      className="hidden lg:block rounded-lg"
                    />
                    <img
                      src={`${product.image}`}
                      alt="Front of women&#039;s Basic Tee in black."
                      className="hidden lg:block rounded-lg"
                    />
                  </div>
                </div>
                <div className="mt-8 lg:col-span-5">
                  <form onSubmit={onSubmitHandler}>
                    {/* <div>
                      <h2 className="text-sm font-medium text-gray-900">
                        Color
                      </h2>
                      <fieldset className="mt-2">
                        <legend className="sr-only">Choose a color</legend>
                        <div className="flex items-center space-x-3">
                          <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-900">
                            <input
                              type="radio"
                              name="color-choice"
                              value="Black"
                              className="sr-only"
                              aria-labelledby="color-choice-0-label"
                            />
                            <span id="color-choice-0-label" className="sr-only">
                              {" "}
                              Black{" "}
                            </span>
                            <span
                              aria-hidden="true"
                              className="h-8 w-8 bg-gray-900 rounded-full border border-black border-opacity-10"
                            ></span>
                          </label>
                          <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
                            <input
                              type="radio"
                              name="color-choice"
                              value="Heather Grey"
                              className="sr-only"
                              aria-labelledby="color-choice-1-label"
                            />
                            <span id="color-choice-1-label" className="sr-only">
                              {" "}
                              Heather Grey{" "}
                            </span>
                            <span
                              aria-hidden="true"
                              className="h-8 w-8 bg-gray-400 rounded-full border border-black border-opacity-10"
                            ></span>
                          </label>
                        </div>
                      </fieldset>
                    </div> */}
                    {/* <div className="mt-8">
                      <div className="flex items-center justify-between">
                        <h2 className="text-sm font-medium text-gray-900">
                          Size
                        </h2>
                        <a
                          href="#"
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          See sizing chart
                        </a>
                      </div>
                      <fieldset className="mt-2">
                        <legend className="sr-only">Choose a size</legend>
                        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                          <label className="flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none">
                            <input
                              type="radio"
                              name="size-choice"
                              value="XXS"
                              className="sr-only"
                              aria-labelledby="size-choice-0-label"
                            />
                            <span id="size-choice-0-label">XXS</span>
                          </label>
                          <label className="flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none">
                            <input
                              type="radio"
                              name="size-choice"
                              value="XS"
                              className="sr-only"
                              aria-labelledby="size-choice-1-label"
                            />
                            <span id="size-choice-1-label">XS</span>
                          </label>
                          <label className="flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none">
                            <input
                              type="radio"
                              name="size-choice"
                              value="S"
                              className="sr-only"
                              aria-labelledby="size-choice-2-label"
                            />
                            <span id="size-choice-2-label">S</span>
                          </label>
                          <label className="flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none">
                            <input
                              type="radio"
                              name="size-choice"
                              value="M"
                              className="sr-only"
                              aria-labelledby="size-choice-3-label"
                            />
                            <span id="size-choice-3-label">M</span>
                          </label>
                          <label className="flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none">
                            <input
                              type="radio"
                              name="size-choice"
                              value="L"
                              className="sr-only"
                              aria-labelledby="size-choice-4-label"
                            />
                            <span id="size-choice-4-label">L</span>
                          </label>
                          <label className="flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1 cursor-not-allowed opacity-25">
                            <input
                              type="radio"
                              name="size-choice"
                              value="XL"
                              disabled
                              className="sr-only"
                              aria-labelledby="size-choice-5-label"
                            />
                            <span id="size-choice-5-label">XL</span>
                          </label>
                        </div>
                      </fieldset>
                    </div> */}

                    {product.countInStock > 0 ? (
                      <select ref={qtyInputRef} name="quantity">
                        {createStockDropdownvalues(product.countInStock)}
                      </select>
                    ) : (
                      <p className="text-red-500">Out of Stock</p>
                    )}

                    <button
                      onClick={addItemtoCartHandler}
                      type="submit"
                      className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Add to cart
                    </button>
                  </form>
                  <div className="mt-10">
                    <h2 className="text-sm font-medium text-gray-900">
                      Description
                    </h2>
                    <div className="prose prose-sm mt-4 text-gray-500">
                      <p>{product.description}</p>
                    </div>
                  </div>

                  <section aria-labelledby="policies-heading" className="mt-10">
                    <h2 id="policies-heading" className="sr-only">
                      Our Policies
                    </h2>
                    <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                        <dt>
                          <svg
                            className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64"
                            />
                          </svg>
                          <span className="mt-4 text-sm font-medium text-gray-900">
                            International delivery
                          </span>
                        </dt>
                        <dd className="mt-1 text-sm text-gray-500">
                          Get your order in 2 years
                        </dd>
                      </div>
                      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                        <dt>
                          <svg
                            className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="mt-4 text-sm font-medium text-gray-900">
                            Loyalty rewards
                          </span>
                        </dt>
                        <dd className="mt-1 text-sm text-gray-500">
                          Don&#039;t look at other tees
                        </dd>
                      </div>
                    </dl>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default ViewProduct;
