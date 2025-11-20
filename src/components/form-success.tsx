import React from "react";

interface FormSuccessProps {
  message?: string;
}

export default function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null;

  return (
    <div className="flex items-center text-sm text-emerald-500">
      <p>{message}</p>
    </div>
  );
}
