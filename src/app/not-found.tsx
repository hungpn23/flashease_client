import { Container } from "@/components/layouts/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container className="flex flex-col space-y-4">
      <h2>404 Page Not Found</h2>
      <Button>
        <Link href="/">Return Home</Link>
      </Button>
    </Container>
  );
}
