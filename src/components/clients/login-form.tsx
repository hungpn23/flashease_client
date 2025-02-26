"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect, useState } from "react";
import { login } from "@/actions/auth.action";
import type { TAuthState } from "@/types/auth.type";
import { showErrorBorder } from "@/lib/show-error-border";
import { showErrorDetail } from "@/lib/show-error-detail";
import toast from "react-hot-toast";

export function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [state, action, isPending] = useActionState<TAuthState, FormData>(
    login,
    null,
  );

  useEffect(() => {
    if (state?.error) toast.error(state.error.message);
  }, [state]);

  const errorDetails = state?.error.details;

  return (
    <form className="grid gap-6" action={action}>
      <div className="grid gap-2">
        <Label htmlFor="email">
          Email<span className="text-red-500">*</span>
        </Label>

        <Input
          className={errorDetails && showErrorBorder(errorDetails, "email")}
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          tabIndex={1}
          autoFocus
          required
        />

        {errorDetails && showErrorDetail(errorDetails, "email")}
      </div>

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
