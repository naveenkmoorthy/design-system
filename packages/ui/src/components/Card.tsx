import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "elevated" | "outlined" | "ghost";
  padding?: "none" | "sm" | "md" | "lg";
}

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export type CardBodyProps = React.HTMLAttributes<HTMLDivElement>;
export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

const variantClasses = {
  elevated: "bg-bg shadow-md border border-border",
  outlined: "bg-bg border border-border",
  ghost:    "bg-bg-subtle",
};

const paddingClasses = {
  none: "",
  sm:   "p-3",
  md:   "p-5",
  lg:   "p-8",
};

function Card({
  variant = "elevated",
  padding = "md",
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={[
        "rounded-xl",
        variantClasses[variant],
        paddingClasses[padding],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({ className = "", children, ...props }: CardHeaderProps) {
  return (
    <div
      className={["mb-4 flex flex-col gap-1", className].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

function CardBody({ className = "", children, ...props }: CardBodyProps) {
  return (
    <div className={["text-text-muted", className].join(" ")} {...props}>
      {children}
    </div>
  );
}

function CardFooter({ className = "", children, ...props }: CardFooterProps) {
  return (
    <div
      className={[
        "mt-4 pt-4 border-t border-border flex items-center gap-2",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export { Card };
