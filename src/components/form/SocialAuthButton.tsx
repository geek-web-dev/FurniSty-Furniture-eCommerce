"use client";
import { signIn } from "next-auth/react";

import React from "react";
import { DEFAULT_LOGIN_REDIRECT } from "../../../routes";
import { Button } from "../ui/button";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const SocialAuthButton = ({
  provider,
}: {
  provider: "google" | "facebook";
}) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const clickHandler = () => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <Button
      variant="outline"
      type="button"
      className="w-full mt-4"
      onClick={clickHandler}
    >
      <Image
        src={`/icons/${provider}.svg`}
        width={20}
        height={20}
        alt="Google"
        className="mr-2"
      />{" "}
      Continue With <span className="capitalize ml-1">{provider}</span>
    </Button>
  );
};

export default SocialAuthButton;
