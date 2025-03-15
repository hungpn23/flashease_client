"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { UploadAvatar } from "@/app/profile/_actions/upload-avatar";

export default function UploadAvatarForm() {
  const [error, action, isPending] = useActionState(UploadAvatar, undefined);

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  return (
    <form className="space-y-4" action={action}>
      <Input
        className="cursor-pointer hover:underline"
        type="file"
        name="avatar"
        accept="image/jpeg"
      />

      <Button type="submit" disabled={isPending}>
        Save change
      </Button>
    </form>
  );
}
