import React from "react";

interface FormErrorProps {
  message?: string;
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="flex items-center text-sm text-red-600">
      <p>{message}</p>
    </div>
  );
}
