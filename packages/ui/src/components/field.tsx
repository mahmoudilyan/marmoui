import * as React from "react";
import { cn } from "../lib/utils";

export interface FieldProps {
  children: React.ReactNode;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  errorText?: React.ReactNode;
  optionalText?: React.ReactNode;
  required?: boolean;
  className?: string;
}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ children, label, helperText, errorText, optionalText, required, className, ...props }, ref) => {
    const hasError = !!errorText;

    return (
      <div ref={ref} className={cn("space-y-1", className)} {...props}>
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
            {required ? (
              <span className="text-destructive ml-1">*</span>
            ) : (
              optionalText && (
                <span className="text-muted-foreground ml-1">({optionalText})</span>
              )
            )}
          </label>
        )}
        {children}
        {helperText && !hasError && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
        {errorText && (
          <p className="text-sm text-destructive">{errorText}</p>
        )}
      </div>
    );
  }
);

Field.displayName = "Field";

export { Field };