import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUserAction } from "../actions/admin-action";
import useFetch from "../hooks/useFetchHooks";
import Spinner from "./Spinner";

const ApproveAdmin = () => {
  const { user_id } = useParams();
  console.log("user_id", user_id);

  const dispatch = useDispatch();

  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:4000/api/users/user`
  );

  const [userData, setuserData] = useState("");
  const [isAlreadyAdmin, setIsAlreadyAdmin] = useState("");

  useEffect(() => {
    setuserData(data);
    setIsAlreadyAdmin(data.isAdmin);
  }, [data]);

  const onChangeHandler = (e) => {
    setuserData((prevUserData) => {
      return { ...prevUserData, [e.target.name]: e.target.value };
    });
  };

  const adminChangeHandler = () => {
    setIsAlreadyAdmin(!isAlreadyAdmin);
  };

  console.log("sendData", { ...userData, isAdmin: isAlreadyAdmin });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserAction({ ...userData, isAdmin: isAlreadyAdmin }));
  };
  return (
    <Fragment>
      {loading && <Spinner />}
      {!loading && !data && <Spinner />}
      {!loading && data && (
        <section class="bg-gray-50 dark:bg-gray-900">
          <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Update User Details
                </h1>
                <form class="space-y-4 md:space-y-6" onSubmit={onSubmitHandler}>
                  <div>
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      onChange={onChangeHandler}
                      name="name"
                      id="name"
                      value={userData.name}
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      onChange={onChangeHandler}
                      name="email"
                      id="email"
                      value={userData.email}
                      placeholder="••••••••"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input
                          id="admin"
                          aria-describedby="admin"
                          checked={isAlreadyAdmin}
                          onChange={adminChangeHandler}
                          type="checkbox"
                          name="isAdmin"
                          class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          required=""
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label
                          for="admin"
                          class="text-gray-500 dark:text-gray-300"
                        >
                          make Admin
                        </label>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default ApproveAdmin;
