"use client";
import Heading from "@/components/common/Heading";
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
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/hooks/use-current-user";
import { sendContactEmail } from "@/lib/mail";
import { contactSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const ContactPage = () => {
  const [isPending, startTransition] = useTransition();
  const user = useCurrentUser();

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: "",
      subject: "",
    },
  });

  const submitHandler = (values: z.infer<typeof contactSchema>) => {
    startTransition(async () => {
      // await sendContactEmail(user?.email, values.subject);
    });
    // console.log("asd");
  };

  return (
    <>
      <Heading title="Support" location="/ support" />
      <Form {...form}>
        <form
          className="max-w-[600px] mx-auto mt-20"
          onSubmit={form.handleSubmit(submitHandler)}
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={6}
                      placeholder="you message"
                      disabled={isPending}
                      autoComplete="on"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full mt-4 bg-[--btn-color-2] hover:bg-[--btn-hover-color-2] text-white"
            disabled={isPending}
          >
            Send
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ContactPage;
