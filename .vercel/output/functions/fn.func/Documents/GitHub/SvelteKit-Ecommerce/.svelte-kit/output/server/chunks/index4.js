import { tv } from "tailwind-variants";
import "clsx";
const alertVariants = tv({
  base: "relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:text-foreground [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11",
  variants: {
    variant: {
      default: "bg-background text-foreground",
      destructive: "text-destructive border-destructive/50 dark:border-destructive [&>svg]:text-destructive text-destructive"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
export {
  alertVariants as a
};
