import { useEffect } from "react";
import { dotSpinner } from "ldrs";

export default function Loading() {
  useEffect(() => {
    dotSpinner.register();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <l-dot-spinner size="30" speed="0.9" color="black"></l-dot-spinner>
    </div>
  );
}
