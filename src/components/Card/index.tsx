import { CardStyled } from "./CardStyled";
import { PropsWithChildren } from "react";

export default function Card({ children }: PropsWithChildren) {
  return <CardStyled>{children}</CardStyled>;
}
