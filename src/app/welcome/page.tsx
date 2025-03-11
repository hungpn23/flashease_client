import { Container } from "@/components/layouts/container";
import { Button } from "@/components/ui/button";
import { TextEffect } from "@/components/ui/text-effect";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Welcome() {
  return (
    <Container className="text-center">
      <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
        Simple to learn,
        <span className="inline-block">easy to remember!</span>
      </h1>

      <TextEffect
        className="mx-auto my-12 max-w-3xl text-muted-foreground sm:text-xl"
        per="char"
        preset="fade"
      >
        FlashEase is a free English learning flashcard app, designed with a
        simple, user-friendly interface and optimized performance for effective
        learning
      </TextEffect>

      <Link href="/login">
        <Button>
          Start learning <ArrowRight className="h4 inline w-4" />
        </Button>
      </Link>
    </Container>
  );
}
