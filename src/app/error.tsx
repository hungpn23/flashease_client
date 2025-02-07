"use client"; // Error boundaries must be Client Components

import { Container } from "@/components/layouts/container";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container>
      <h2>Something went wrong!</h2>
      <button className="underline underline-offset-4" onClick={() => reset()}>
        Try again
      </button>
    </Container>
  );
}
