import React from "react";
import { cn } from "@/lib/utils";

type BlockquoteProps = {
  children?: React.ReactNode;
  className?: string;
};

const Blockquote = ({ children, className }: BlockquoteProps) => {
  return (
    <div
      className={cn(
        "relative rounded-lg border-l-8 border-l-primary bg-secondary/15 py-2 pl-12 pr-2 text-base italic text-muted-foreground/75 before:absolute before:left-3 before:top-3 before:font-serif before:text-5xl before:text-primary before:content-['“']",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BlockquoteAuthor = ({ children, className }: BlockquoteProps) => {
  return (
    <p
      className={cn(
        "mt-2 pr-2 text-right font-bold not-italic text-primary",
        className,
      )}
    >
      {children}
    </p>
  );
};

export { Blockquote, BlockquoteAuthor };
