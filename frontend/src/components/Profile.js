import React, { Fragment } from "react";
import OrdersList from "./OrdersList";
import UpdateProfileForm from "./UpdateProfileForm";

const Profile = () => {
  return (
    <Fragment>
      <UpdateProfileForm />
      <OrdersList />
    </Fragment>
  );
};

export default Profile;
