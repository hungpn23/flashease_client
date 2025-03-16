"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import toast from "react-hot-toast";
import {
  RegisterInput,
  registerSchema,
  RegisterState,
} from "@/app/(auth)/_types/register.type";
import { useActionState, useEffect, startTransition } from "react";
import { registerAction } from "@/app/(auth)/_actions/register";
import { showErrorBorder } from "@/lib/show-error-border";
import { showErrorDetail } from "@/lib/show-error-detail";
import { Container } from "@/components/layouts/container";
import { convertToFormData } from "@/lib/convert-formdata";

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState<
    RegisterState,
    FormData
  >(registerAction, {});
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      ...(state.input ?? {}),
    },
    mode: "onTouched",
  });
  const errorDetails = state.error?.details;

  useEffect(() => {
    if (state.error && state.error.details === undefined)
      toast.error(state.error.message);
  }, [state]);

  const onSubmit: SubmitHandler<RegisterInput> = (data: RegisterInput) => {
    startTransition(() => formAction(convertToFormData(data)));
  };

  return (
    <Container>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Create a new account by filling out the form below.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                {/* Username */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="username">Username</FormLabel>
                      <FormControl>
                        <div>
                          <Input
                            className={
                              errorDetails &&
                              showErrorBorder(errorDetails, "username")
                            }
                            id="username"
                            placeholder="johndoe"
                            {...field}
                          />

                          {errorDetails &&
                            showErrorDetail(errorDetails, "username")}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <div>
                          <Input
                            className={
                              errorDetails &&
                              showErrorBorder(errorDetails, "email")
                            }
                            id="email"
                            placeholder="johndoe@mail.com"
                            type="email"
                            autoComplete="email"
                            {...field}
                          />

                          {errorDetails &&
                            showErrorDetail(errorDetails, "email")}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <div>
                          <PasswordInput
                            className={
                              errorDetails &&
                              showErrorBorder(errorDetails, "password")
                            }
                            id="password"
                            placeholder="******"
                            autoComplete="new-password"
                            {...field}
                          />

                          {errorDetails &&
                            showErrorDetail(errorDetails, "password")}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="confirmPassword">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <div>
                          <PasswordInput
                            className={
                              errorDetails &&
                              showErrorBorder(errorDetails, "confirmPassword")
                            }
                            id="confirmPassword"
                            placeholder="******"
                            autoComplete="new-password"
                            {...field}
                          />

                          {errorDetails &&
                            showErrorDetail(errorDetails, "confirmPassword")}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <Button disabled={isPending} type="submit" className="w-full">
                  Register
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
