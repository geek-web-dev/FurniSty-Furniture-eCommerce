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
import { newPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/app/_actions/new-password";
import RetryButton from "../common/RetryButton";

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const submitHandler = (values: z.infer<typeof newPasswordSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      newPassword(values, token)
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
        {error === "Network Error" ? <RetryButton /> : null}
        <FormSuccess message={success} />
        <Button
          type="submit"
          className="w-full mt-4 bg-[--btn-color-2] hover:bg-[--btn-hover-color-2]"
          disabled={isPending}
        >
          Reset password
        </Button>
        <Button variant="link" asChild>
          <Link href="/auth/login">Back to login</Link>
        </Button>
      </form>
    </Form>
  );
};

export default NewPasswordForm;
