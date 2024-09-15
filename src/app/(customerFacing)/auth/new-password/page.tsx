import Heading from "@/components/common/Heading";
import NewPasswordForm from "@/components/form/NewPasswordForm";
import React from "react";

const NewPasswordPage = () => {
  return (
    <>
      <Heading title="New Password" location="/ auth / new-password" />
      <NewPasswordForm />
    </>
  );
};

export default NewPasswordPage;
