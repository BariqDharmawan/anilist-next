import type { PropsWithChildren, ComponentProps } from "react";
import useMounted from "../hooks/use-mounted";

export default function ClientOnly({
  children,
  ...rest
}: PropsWithChildren<ComponentProps<"div">>) {
  const hasMounted = useMounted();

  if (!hasMounted) {
    return null;
  }

  return <div {...rest}>{children}</div>;
}
