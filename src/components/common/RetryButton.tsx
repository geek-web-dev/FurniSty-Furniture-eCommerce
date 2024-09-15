"use client";
import { Button } from "../ui/button";

const RetryButton = () => {
  return (
    <Button
      onClick={() => window.location.reload()}
      variant="link"
      className="text-blue-500 text-lg mx-auto block mt-4"
    >
      Try Again
    </Button>
  );
};

export default RetryButton;
