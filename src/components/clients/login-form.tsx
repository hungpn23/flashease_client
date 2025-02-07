"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect } from "react";
import { login } from "@/actions/login.action";
import { useToast } from "@/hooks/use-toast";
import type { LoginStateType } from "@/types/auth.type";
import { showErrorBorder } from "@/lib/show-error-border";
import { showErrorDetail } from "@/lib/show-error-detail";

export function LoginForm() {
  const { toast } = useToast();

  const [state, action, isPending] = useActionState<LoginStateType, FormData>(
    login,
    null,
  );

  useEffect(() => {
    if (state?.error && state?.error.details === undefined) {
      toast({
        variant: "destructive",
        title: "Login failed.",
        description: state.error.message,
      });
    }
  }, [state, toast]);

  const errorDetails = state?.error.details;

  return (
    <form className="grid gap-6" action={action}>
      <div className="grid gap-2">
        <Label htmlFor="email" aria-required>
          Email<span className="text-red-500">*</span>
        </Label>

        <Input
          className={errorDetails && showErrorBorder(errorDetails, "email")}
          name="email"
          type="email"
          placeholder="user@example.com"
          defaultValue={state?.input.email}
          tabIndex={1}
          autoFocus
          required
        />

        {errorDetails && showErrorDetail(errorDetails, "email")}
      </div>

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password" aria-required>
            Password<span className="text-red-500">*</span>
          </Label>

          <a
            href="#"
            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
          >
            Forgot your password?
          </a>
        </div>

        <Input
          className={errorDetails && showErrorBorder(errorDetails, "password")}
          name="password"
          type="password"
          defaultValue={state?.input.password}
          tabIndex={2}
          required
        />

        {errorDetails && showErrorDetail(errorDetails, "password")}
      </div>

      <Button disabled={isPending} type="submit" className="w-full">
        Login
      </Button>

      <Button disabled={isPending} variant="outline" className="w-full">
        Login with Google
      </Button>
    </form>
  );
}
