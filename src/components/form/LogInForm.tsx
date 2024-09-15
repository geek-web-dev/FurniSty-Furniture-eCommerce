"use client";
import FormError from "@/components/form/FormError";
import FormSuccess from "@/components/form/FormSuccess";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { logInSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { login } from "@/app/_actions/log-in";
import SocialAuthButton from "./SocialAuthButton";
import { useSearchParams } from "next/navigation";
import RetryButton from "../common/RetryButton";

const LogInForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "email already used in different provider"
      : "";
  const callbackUrl = searchParams.get("callbackUrl");

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitHandler = (values: z.infer<typeof logInSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data?.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data?.success);
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Network Error"));
    });
  };

  return (
    <Form {...form}>
      <form
        className="max-w-[600px] mx-auto"
        onSubmit={form.handleSubmit(submitHandler)}
      >
        <div className="space-y-4">
          {showTwoFactor ? (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Two Factor Code</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="2FA code"
                      disabled={isPending}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
          {!showTwoFactor ? (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Your Email"
                        type="email"
                        disabled={isPending}
                        autoComplete="on"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Your Password"
                        type="password"
                        disabled={isPending}
                        autoComplete="off"
                      />
                    </FormControl>
                    <Button
                      asChild
                      size="sm"
                      variant="link"
                      className="px-0 font-normal"
                    >
                      <Link href="/auth/reset">Forgot Password?</Link>
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : null}
        </div>
        <FormError message={error || urlError} />
        {error === "Network Error" ? <RetryButton /> : null}
        <FormSuccess message={success} />
        <Button
          type="submit"
          className="w-full mt-4 bg-[--btn-color-2] hover:bg-[--btn-hover-color-2] text-white"
          disabled={isPending}
        >
          {showTwoFactor ? "Confirm" : "Log In"}
        </Button>
        <div className="flex justify-center sm:gap-4 flex-wrap sm:flex-nowrap">
          <SocialAuthButton provider="google" />
          <SocialAuthButton provider="facebook" />
        </div>
        <p className="mt-4 text-center text-gray-600">
          Dont have an account?{" "}
          <Link
            href={"/auth/sign-up"}
            className="font-semibold text-blue-500 underline hover:text-blue-600"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default LogInForm;
