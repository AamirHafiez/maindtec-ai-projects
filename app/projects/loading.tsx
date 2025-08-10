import { Spinner } from "@/components/ui/spinner";
import React from "react";

function loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spinner />
    </div>
  );
}

export default loading;
