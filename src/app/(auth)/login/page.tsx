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
import toast from "react-hot-toast";
import { PasswordInput } from "@/components/ui/password-input";
import { Container } from "@/components/layouts/container";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { loginAction } from "@/actions/auth/login";
import { showErrorDetail } from "@/lib/show-error-detail";
import { showErrorBorder } from "@/lib/show-error-border";
import { LoginInput, loginSchema, LoginState } from "@/types/auth/login.type";
import { convertToFormData } from "@/lib/to-form-data";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(
    loginAction,
    {},
  );
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      ...(state.input ?? {}),
    },
    mode: "onTouched",
  });
  const errorDetails = state.error?.details;

  useEffect(() => {
    if (state.error && state.error.details === undefined)
      toast.error(state.error.message);
  }, [state]);

  const onSubmit: SubmitHandler<LoginInput> = (data: LoginInput) => {
    startTransition(() => formAction(convertToFormData(data)));
  };

  return (
    <Container>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
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
                    <FormItem className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Link
                          href="/forgot-password"
                          className="ml-auto inline-block text-sm underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <div>
                          <PasswordInput
                            className={
                              errorDetails &&
                              showErrorBorder(errorDetails, "password")
                            }
                            id="password"
                            placeholder="******"
                            autoComplete="current-password"
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

                {/* Login */}
                <Button disabled={isPending} type="submit" className="w-full">
                  Login
                </Button>

                {/* Google */}
                <Button
                  disabled={isPending}
                  variant="outline"
                  className="w-full"
                >
                  Login with Google
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
