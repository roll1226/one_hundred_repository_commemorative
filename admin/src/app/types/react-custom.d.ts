import { FunctionComponent } from "react";

declare module "react" {
  type FCX<P = object> = FunctionComponent<P & { className?: string }>;
}
