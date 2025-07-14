"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import clsx from "clsx";

export default function SmartLink({
  href,
  children,
  className = "",
  loadingText = "Loading...",
  ...props
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = (e) => {
    e.preventDefault();
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        className,
        "transition-all duration-200",
        isPending && "opacity-60 cursor-not-allowed"
      )}
      disabled={isPending}
      {...props}
    >
      {isPending ? loadingText : children}
    </button>
  );
}
