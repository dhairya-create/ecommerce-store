import { forwardRef } from "react";
import { cn } from "@/lib/utils";
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

  const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, children, disabled, type = "button", ...props }, ref) => {
      return (
        <button
          ref={ref}
          className={cn(`
            w-auto
            rounded-full
            border-transparent
            px-5
            py-3
            flex
            disabled:cursor-not-allowed
            disabled:opacity-50
            font-semibold
            hover:opacity-75
            transition       
          `, className)} // Merge custom className here
          disabled={disabled}
          type={type}
          {...props}
        >
          {children}
        </button>
      );
    }
  );
  
Button.displayName = "Button"; // Corrected display name

export default Button;
