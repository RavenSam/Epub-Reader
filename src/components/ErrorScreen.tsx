import React from "react";

interface ErrorScreenProps {
  message: string;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ message }) => (
  <div className="flex items-center justify-center flex-1 text-red-600">
    <p>{message}</p>
  </div>
);

export default ErrorScreen;
