"use client";

import { register } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showErrorBorder } from "@/lib/show-error-border";
import { showErrorDetail } from "@/lib/show-error-detail";
import { TAuthState } from "@/types/auth.type";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";

export function RegisterForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [state, action, isPending] = useActionState<TAuthState, FormData>(
    register,
    null,
  );

  useEffect(() => {
    if (state?.error) toast.error(state.error.message);
  }, [state]);

  const errorDetails = state?.error.details;
  const isPasswordMatch = password === confirmPassword;

  return (
    <form action={action}>
      <div className="grid gap-6">
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
          <Label htmlFor="password">
            Password<span className="text-red-500">*</span>
          </Label>

          <Input
            className={
              errorDetails && showErrorBorder(errorDetails, "password")
            }
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            tabIndex={2}
            required
          />

          {errorDetails && showErrorDetail(errorDetails, "password")}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">
            Confirm password<span className="text-red-500">*</span>
          </Label>

          <Input
            className={isPasswordMatch ? "" : "border-red-500"}
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            tabIndex={3}
            required
          />

          {!isPasswordMatch && (
            <span className="ml-4 text-sm text-red-500">
              - Password does not match.
            </span>
          )}
        </div>

        <Button disabled={isPending} type="submit" className="w-full">
          Register
        </Button>
      </div>
    </form>
  );
}
