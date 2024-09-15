import Heading from "@/components/common/Heading";
import ResetForm from "@/components/form/ResetForm";
import React from "react";

const ResetPage = () => {
  return (
    <>
      <Heading title="Send Reset Email" location="/ auth / reset" />
      <ResetForm />
    </>
  );
};

export default ResetPage;
