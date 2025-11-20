import * as React from "react";

export function GoogleOutlinedIcon({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M21.35 11.1h-9.18v2.98h5.27c-.23 1.5-1.6 4.4-5.27 4.4A6.08 6.08 0 0 1 6.02 12a6.06 6.06 0 0 1 6.15-6.48c2.22 0 3.72.95 4.58 1.76l2.2-2.15C17.32 3.34 15.04 2 12.12 2A10.06 10.06 0 0 0 2 12a10.06 10.06 0 0 0 10.1 10c5.82 0 9.9-4.06 9.9-9.87 0-.66-.08-1.23-.16-1.76Z" />
    </svg>
  );
}
