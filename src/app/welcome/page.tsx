import { Container } from "@/components/layouts/container";
import { Button } from "@/components/ui/button";

export default function Welcome() {
  return (
    <Container className="text-center">
      <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
        Simple to learn, <span className="inline-block">easy to remember!</span>
      </h1>

      <p className="mx-auto my-12 max-w-3xl text-muted-foreground sm:text-xl">
        FlashEase is a free English learning flashcard app, designed with a
        simple, user-friendly interface and optimized performance for effective
        learning
      </p>

      <Button>Start learning</Button>
    </Container>
  );
}
