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
import { signUpSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { signup } from "@/app/_actions/sign-up";
import SocialAuthButton from "./SocialAuthButton";
import RetryButton from "../common/RetryButton";

const SignUpForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const submitHandler = (values: z.infer<typeof signUpSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      signup(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
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
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Your Name"
                    type="text"
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        {error == "Network Error" ? <RetryButton /> : null}
        <FormSuccess message={success} />
        <Button
          type="submit"
          className="w-full mt-4 text-white bg-[--btn-color-2] hover:bg-[--btn-hover-color-2]"
          disabled={isPending}
        >
          Sign Up
        </Button>
        <div className="flex justify-center sm:gap-4 flex-wrap sm:flex-nowrap">
          <SocialAuthButton provider="google" />
          <SocialAuthButton provider="facebook" />
        </div>
        <p className="mt-4 text-center text-gray-600">
          Do you already have an account?{" "}
          <Link
            href={"/log-in"}
            className="font-semibold text-blue-500 underline hover:text-blue-600"
          >
            Log In
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default SignUpForm;
