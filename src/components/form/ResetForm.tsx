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
import { resetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { reset } from "@/app/_actions/reset";
import RetryButton from "../common/RetryButton";

const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  const submitHandler = (values: z.infer<typeof resetSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      reset(values)
        .then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
        })
        .catch(() => setError("Network Error"));
    });
  };

  return (
    <Form {...form}>
      <form
        action=""
        className="max-w-[600px] mx-auto"
        onSubmit={form.handleSubmit(submitHandler)}
      >
        <div className="space-y-4">
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
        </div>
        <FormError message={error} />
        {error == "Network Error" ? <RetryButton /> : null}
        <FormSuccess message={success} />
        <Button
          type="submit"
          className="w-full mt-4 bg-[--btn-color-2] hover:bg-[--btn-hover-color-2] text-white"
          disabled={isPending}
        >
          Send reset email
        </Button>
        <p className="mt-4 text-center text-gray-600">
          Dont have an account?{" "}
          <Link
            href={"/log-in"}
            className="font-semibold text-blue-500 underline hover:text-blue-600"
          >
            Back to login
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default ResetForm;
