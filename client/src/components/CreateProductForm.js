import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { addProductAction } from "../actions/admin-action";
import { useNavigate } from "react-router-dom";

const CreateProductForm = () => {
  const formValidationSchema = yup.object({
    name: yup.string().required("please enter a valid Name"),
    image: yup
      .string()
      .matches(/^https/, "Enter correct url!")
      .required("Please enter valid url"),
    brand: yup.string().required("please enter a valid Brand"),
    category: yup.string().required("please enter a valid Category"),
    price: yup
      .number("please enter only number")
      .required("please enter a valid Price")
      .min(1, "Product Price should be greater than 1"),
    countInStock: yup
      .number()
      .required("please enter a valid stock")
      .min(0, "Stock should be less than or equal to 0"),
    description: yup.string().required("please enter a Description"),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
      brand: "",
      category: "United States",
      price: 0,
      countInStock: 0,
      description: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      dispatch(addProductAction({ ...formik.values }))
        .then((data) => {
          navigate("/products");
        })
        .catch((error) => {
          console.log("error in createProductForm", error);
        });
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Add Product
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                for="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {formik.touched.name && formik.errors.name ? (
                  <p style={{ color: "red" }}> {formik.errors.name}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                for="image"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image Url
              </label>
              <div className="mt-2">
                <input
                  id="image"
                  name="image"
                  value={formik.values.image}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="url"
                  autoComplete="image"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {formik.touched.image && formik.errors.image ? (
                  <p style={{ color: "red" }}> {formik.errors.image}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                for="brand"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Brand
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  value={formik.values.brand}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {formik.touched.brand && formik.errors.brand ? (
                  <p style={{ color: "red" }}> {formik.errors.brand}</p>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                for="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <select
                  id="category"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="category-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
                {formik.touched.category && formik.errors.category ? (
                  <p style={{ color: "red" }}> {formik.errors.category}</p>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                for="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {formik.touched.price && formik.errors.price ? (
                  <p style={{ color: "red" }}> {formik.errors.price}</p>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                for="countInStock"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                CountInStock
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  value={formik.values.countInStock}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="countInStock"
                  id="countInStock"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {formik.touched.countInStock && (
                  <p style={{ color: "red" }}> {formik.errors.countInStock}</p>
                )
                  ? formik.errors.countInStock
                  : ""}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="description"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2.5">
                <textarea
                  name="description"
                  id="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
                {formik.touched.description && formik.errors.description ? (
                  <p style={{ color: "red" }}> {formik.errors.description}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 py-2 px-5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateProductForm;
