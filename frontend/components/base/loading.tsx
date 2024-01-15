import { Spinner } from "@phosphor-icons/react/dist/ssr";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center p-10">
      <Spinner size={35} className="animate-spin" />
    </div>
  );
};

export default Loading;
