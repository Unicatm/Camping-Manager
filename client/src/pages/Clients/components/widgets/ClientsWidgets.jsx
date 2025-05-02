import React from "react";
import ClientGrowthWidget from "./ClientGrowthWidget";

export default function ClientsWidgets() {
  return (
    <div className="flex flex-col items-center justify-between gap-4 w-1/2 pb-6">
      <ClientGrowthWidget />
    </div>
  );
}
