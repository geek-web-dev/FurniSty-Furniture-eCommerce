import Heading from "@/components/common/Heading";
import NewVerificationForm from "@/components/form/NewVerificationForm";

const NewVerificationPage = () => {
  return (
    <>
      <Heading
        title="Email Verification"
        location="/ auth / new-verification"
      />
      <NewVerificationForm />
    </>
  );
};

export default NewVerificationPage;
