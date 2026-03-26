import * as React from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  hint?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

const sizeClasses = {
  sm: "h-8 text-sm px-3",
  md: "h-10 text-base px-4",
  lg: "h-12 text-lg px-4",
};

export function Input({
  label,
  hint,
  error,
  size = "md",
  leftElement,
  rightElement,
  className = "",
  id,
  disabled,
  ...props
}: InputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-text"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leftElement && (
          <div className="absolute left-3 flex items-center text-text-muted">
            {leftElement}
          </div>
        )}

        <input
          id={inputId}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={
            error ? errorId : hint ? hintId : undefined
          }
          className={[
            "w-full rounded-md border bg-bg text-text",
            "placeholder:text-text-subtle",
            "transition-colors duration-normal",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            hasError
              ? "border-danger-500 focus-visible:ring-danger-500"
              : "border-border hover:border-border-strong",
            leftElement ? "pl-10" : "",
            rightElement ? "pr-10" : "",
            sizeClasses[size],
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />

        {rightElement && (
          <div className="absolute right-3 flex items-center text-text-muted">
            {rightElement}
          </div>
        )}
      </div>

      {error && (
        <p id={errorId} className="text-sm text-danger-600">
          {error}
        </p>
      )}

      {hint && !error && (
        <p id={hintId} className="text-sm text-text-muted">
          {hint}
        </p>
      )}
    </div>
  );
}
