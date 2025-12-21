import React from "react";

import { cn } from "../lib/utils";

type ButtonOrAnchorProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  variant?: "primary" | "secondary";
} & React.ComponentPropsWithoutRef<T>;

type Props<T extends React.ElementType> = ButtonOrAnchorProps<T> & (T extends "a" ? { href: string } : object);

export default function Button<T extends React.ElementType = "button">({
  as,
  className,
  variant = "primary",
  ...props
}: Props<T>) {
  const Component = as || "button";

  return (
    <Component
      className={cn(
        "inline-flex cursor-pointer text-center flex items-center justify-center shrink-0 py-2.5 px-5 text-sm font-medium transition-all duration-150 ease-in-out rounded-full",
        variant === "primary"
          ? "bg-white text-black border border-gray-300 hover:bg-gray-100 focus-visible:ring-gray-400"
          : "bg-black text-white border border-white/15 hover:bg-white/10 focus-visible:ring-white",
        className,
      )}
      {...props}
    >
      {props.children}
    </Component>
  );
}
