import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart, updateShippingAddress } from "../slices/cartSlice";
import axios from "axios";
import {
  createOrderAction,
  createOrderInRazorpayAction,
} from "../actions/cart";
import { Link, useNavigate } from "react-router-dom";
// import Razorpay from "razorpay";

const Checkout = () => {
  const { cartItems, shippingAddress } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const nameInputRef = useRef("");
  const addressInputRef = useRef("");
  const cityInputRef = useRef("");
  const countryInputRef = useRef("");
  const postalCodeInputRef = useRef("");
  const phoneNumberInputRef = useRef("");

  console.log("cart in cart", cartItems);

  const dispatch = useDispatch();
  const removeCartItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const { user } = useSelector((state) => state.auth);
  console.log("user in checkout", user);

  let totalItemsAmount =
    cartItems.length > 0
      ? cartItems.reduce((previous, current) => {
          let currentItemTotal = current.qty * current.price;
          return previous + currentItemTotal;
        }, 0)
      : 0;

  let totalCartItemsAmount = totalItemsAmount + 5 + 8;

  const createOrder = (e) => {
    e.preventDefault();
    let shippingAddress = {
      phoneNumber: phoneNumberInputRef.current.value,
      city: cityInputRef.current.value,
      country: countryInputRef.current.value,
      address: addressInputRef.current.value,
      postalCode: postalCodeInputRef.current.value,
      name: nameInputRef.current.value,
    };
    dispatch(updateShippingAddress(shippingAddress));
  };

  const initPayment = (data) => {
    console.log("entered into initpayment", data);
    const options = {
      key: "rzp_test_gGGSIzWxM9kpYm",
      amount: data.amount,
      currency: data.currency,
      name: "mernshop",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:4000/api/payment/verify";
          const { data } = await axios.post(verifyUrl, response);
          navigate("/confirmedorder");
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const orderUrl = "http://localhost:4000/api/payment/orders";
      const { data } = await axios.post(orderUrl, {
        amount: totalCartItemsAmount,
      });
      const orderData = {
        user: user._id,
        orderItems: cartItems.map((item) => {
          return {
            name: item.name,
            qty: item.qty,
            image: item.image,
            product: item._id,
            price: item.qty * item.price,
          };
        }),
        shippingAddress: {
          address: shippingAddress.address,
          city: shippingAddress.city,
          postalCode: shippingAddress.postalCode,
          country: shippingAddress.country,
        },
        paymentMethod: "razorpay",
        taxPrice: 50,
        shippingPrice: 14,
        totalPrice: totalCartItemsAmount,
      };
      dispatch(createOrderAction(data, orderData, initPayment));
      // console.log("data", data);
      // console.log("orderData", orderData);
      // initPayment(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Checkout</h2>
        <form
          onSubmit={createOrder}
          className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
        >
          <div>
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Contact information
              </h2>

              <div className="sm:col-span-2">
                <label
                  for="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    ref={phoneNumberInputRef}
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">
                Shipping information
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div className="sm:col-span-2">
                  <label
                    for="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      ref={nameInputRef}
                      id="name"
                      autoComplete="street-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    for="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="address"
                      ref={addressInputRef}
                      id="address"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      ref={cityInputRef}
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <div className="mt-1">
                    <select
                      id="country"
                      name="country"
                      ref={countryInputRef}
                      autoComplete="country-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    for="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Postal code
                  </label>
                  <div className="mt-1">
                    <input
                      ref={postalCodeInputRef}
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <fieldset>
                <legend className="text-lg font-medium text-gray-900">
                  Delivery method
                </legend>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <label className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
                    <input
                      type="radio"
                      name="delivery-method"
                      value="Standard"
                      className="sr-only"
                      aria-labelledby="delivery-method-0-label"
                      aria-describedby="delivery-method-0-description-0 delivery-method-0-description-1"
                    />
                    <span className="flex flex-1">
                      <span className="flex flex-col">
                        <span
                          id="delivery-method-0-label"
                          className="block text-sm font-medium text-gray-900"
                        >
                          Standard
                        </span>
                        <span
                          id="delivery-method-0-description-0"
                          className="mt-1 flex items-center text-sm text-gray-500"
                        >
                          4–10 business days
                        </span>
                        <span
                          id="delivery-method-0-description-1"
                          className="mt-6 text-sm font-medium text-gray-900"
                        >
                          $5.00
                        </span>
                      </span>
                    </span>

                    <svg
                      className="h-5 w-5 text-indigo-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <span
                      className="pointer-events-none absolute -inset-px rounded-lg border-2"
                      aria-hidden="true"
                    ></span>
                  </label>

                  <label className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
                    <input
                      type="radio"
                      name="delivery-method"
                      value="Express"
                      className="sr-only"
                      aria-labelledby="delivery-method-1-label"
                      aria-describedby="delivery-method-1-description-0 delivery-method-1-description-1"
                    />
                    <span className="flex flex-1">
                      <span className="flex flex-col">
                        <span
                          id="delivery-method-1-label"
                          className="block text-sm font-medium text-gray-900"
                        >
                          Express
                        </span>
                        <span
                          id="delivery-method-1-description-0"
                          className="mt-1 flex items-center text-sm text-gray-500"
                        >
                          2–5 business days
                        </span>
                        <span
                          id="delivery-method-1-description-1"
                          className="mt-6 text-sm font-medium text-gray-900"
                        >
                          $16.00
                        </span>
                      </span>
                    </span>

                    <svg
                      className="h-5 w-5 text-indigo-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <span
                      className="pointer-events-none absolute -inset-px rounded-lg border-2"
                      aria-hidden="true"
                    ></span>
                  </label>
                </div>
              </fieldset>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">Payment</h2>

              <fieldset className="mt-4">
                <legend className="sr-only">Payment type</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                  <div className="flex items-center">
                    <input
                      id="credit-card"
                      name="payment-type"
                      type="radio"
                      checked
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      for="credit-card"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Credit card
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="paypal"
                      name="payment-type"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      for="paypal"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      PayPal
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="etransfer"
                      name="payment-type"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      for="etransfer"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      eTransfer
                    </label>
                  </div>
                </div>
              </fieldset>

              <div className="mt-6 grid grid-cols-4 gap-y-6 gap-x-4">
                <div className="col-span-4">
                  <label
                    for="card-number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Card number
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="card-number"
                      name="card-number"
                      autoComplete="cc-number"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-4">
                  <label
                    for="name-on-card"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name on card
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name-on-card"
                      name="name-on-card"
                      autoComplete="cc-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-3">
                  <label
                    for="expiration-date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiration date (MM/YY)
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="expiration-date"
                      id="expiration-date"
                      autoComplete="cc-exp"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="cvc"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CVC
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="cvc"
                      id="cvc"
                      autoComplete="csc"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {cartItems.length > 0 &&
                  cartItems.map((item) => {
                    return (
                      <li className="flex py-6 px-4 sm:px-6">
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt="Front of men&#039;s Basic Tee in black."
                            className="w-20 rounded-md"
                          />
                        </div>

                        <div className="ml-6 flex flex-1 flex-col">
                          <div className="flex">
                            <div className="min-w-0 flex-1">
                              <h4 className="text-sm">
                                <a
                                  href="#"
                                  className="font-medium text-gray-700 hover:text-gray-800"
                                >
                                  {item.name}
                                </a>
                              </h4>
                              <p className="mt-1 text-sm text-gray-500">
                                Black
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                Large
                              </p>
                            </div>

                            <div className="ml-4 flow-root flex-shrink-0">
                              <button
                                onClick={() => removeCartItem(item._id)}
                                type="button"
                                className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                              >
                                <span className="sr-only">Remove</span>
                                <svg
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-1 items-end justify-between pt-2">
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              $32.00
                            </p>

                            <div className="ml-4">
                              <label htmlFor="quantity" className="sr-only">
                                Quantity
                              </label>
                              <select
                                id="quantity"
                                name="quantity"
                                className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
              <dl className="space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    $ {totalItemsAmount}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">$ 5.00</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Taxes</dt>
                  <dd className="text-sm font-medium text-gray-900">$ 8.52</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    $ {totalCartItemsAmount}
                  </dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <button
                  onClick={handlePayment}
                  to="/payment"
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Confirm order
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
