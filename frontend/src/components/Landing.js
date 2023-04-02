import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../actions/product-action";
import styles from "../index.css";
import Spinner from "./Spinner";

const Landing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const { products, isLoading } = useSelector((state) => state.product);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {!isLoading && products.length > 0 ? (
            products.map((product) => {
              return (
                <div key={product._id} className="group relative">
                  <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                    <img
                      src={product.image}
                      alt="Front of men&#039;s Basic Tee in black."
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <Link
                    to={`/product/${product._id}`}
                    className="mt-4 flex justify-between"
                  >
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href="#">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          ></span>
                          {product.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.brand}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${product.price}
                    </p>
                  </Link>
                </div>
              );
            })
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
