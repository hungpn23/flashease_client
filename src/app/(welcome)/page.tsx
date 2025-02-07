import { Button } from "@/components/ui/button";

export default function Welcome() {
  return (
    <section className="container mx-auto mt-24">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
          Simple to learn,{" "}
          <span className="inline-block">easy to remember!</span>
        </h1>

        <p className="mx-auto mt-12 max-w-3xl text-muted-foreground sm:text-xl">
          FlashEase is a free English learning flashcard app, designed with a
          simple, user-friendly interface and optimized performance for
          effective learning
        </p>

        <Button className="mt-12">Start learning</Button>
      </div>
    </section>
  );
}
