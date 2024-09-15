"use client";

import { newVerification } from "@/app/_actions/new-verification";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { Button } from "../ui/button";
import Link from "next/link";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const submitHandler = useCallback(() => {
    if (success || error) return;
    if (!token || !email) {
      setError("Missing token!");
      return;
    }
    newVerification(token, email)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => setError("Network Error!"));
  }, [token, success, error, email]);

  useEffect(() => {
    submitHandler();
  }, [submitHandler]);

  return (
    <div className="flex items-center w-full justify-center mt-12">
      {!success && !error ? <BeatLoader /> : null}
      <div className="flex items-center flex-col justify-center gap-3">
        {error ? (
          <>
            <FormError message={error} />
            <Button asChild>
              <Link href="">Send another verification</Link>
            </Button>
          </>
        ) : null}
        {success ? (
          <>
            <FormSuccess message={success} />
            <Button asChild>
              <Link href="/auth/log-in">Back to login</Link>
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default NewVerificationForm;
