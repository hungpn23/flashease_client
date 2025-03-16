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
import { startTransition, useActionState, useEffect } from "react";
import { Login } from "@/app/(auth)/_actions/login";
import { showErrorDetail } from "@/lib/show-error-detail";
import { showErrorBorder } from "@/lib/show-error-border";
import { convertToFormData } from "@/lib/convert-formdata";
import { useRouter, useSearchParams } from "next/navigation";
import { LoginState, LoginInput, loginSchema } from "../_types/login.type";

export default function LoginPage() {
  // **************
  // * NORMAL LOGIN
  // **************
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(
    Login,
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

  // **************
  // * GOOGLE LOGIN
  // **************
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");

    if (accessToken) {
      fetch(`/api/set-cookie?accessToken=${accessToken}`).then((response) => {
        response.ok
          ? toast.success("Login successfully!")
          : toast.error("Login failed!");
        router.refresh();
      });
    }
  }, [searchParams, router]);

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
              </div>
            </form>
          </Form>

          {/* Google */}
          <Button
            onClick={() => router.push(`/api/v1/auth/google`)}
            variant="outline"
            className="mt-4 w-full"
          >
            Login with Google
          </Button>

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
