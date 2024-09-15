"use client";
import Heading from "@/components/common/Heading";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Settings } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { settingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import Alert from "@/components/common/Alert";
import { user } from "@/config";

const SettingsPage = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });

  const submitHandler = (values: z.infer<typeof settingsSchema>) => {};

  const action = () => {};

  return (
    <>
      <Heading title={"Settings"} location="/ pages / settings" />
      <Card>
        <CardHeader>
          <h3 className="text-2xl font-semibold text-center flex items-center gap-2">
            <Settings className="text-slate-500" />
            Settings
          </h3>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="grid sm:grid-cols-2 gap-4 pb-16"
              onSubmit={form.handleSubmit(submitHandler)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="your name"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!user?.isOAuth ? (
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
                            placeholder="your email"
                            disabled={isPending}
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
                            placeholder="your password"
                            type="password"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="your new password"
                            type="password"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              ) : null}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="select a role" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem
                          value={"ADMIN"}
                          className="hover:!bg-[--hover-color]"
                        >
                          Admin
                        </SelectItem>
                        <SelectItem
                          value={"User"}
                          className="hover:!bg-[--hover-color]"
                        >
                          User
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!user?.isOAuth ? (
                <FormField
                  control={form.control}
                  name="isTwoFactorEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Two Factor Authentication</FormLabel>
                        <FormDescription className="text-[--p-color]">
                          Enable Two Factor Authentication for your account
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ) : null}

              <Button
                type="submit"
                className="mt-8 bg-[--btn-color-2] hover:bg-[--btn-hover-color-2] text-white"
                disabled={isPending}
              >
                Update
              </Button>
              <Alert
                actionName="Delete My Account"
                action={action}
                des="you will delete your account"
                className="h-fit mt-8 bg-red-500/75 hover:bg-red-500 text-white rounded-sm py-2"
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default SettingsPage;
