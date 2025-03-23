import React from "react";
import IncomingRevenueChart from "../components/charts/IncomingRevenueChart";
import PredominantNationalitiesChart from "../components/charts/PredominantNationalitiesChart";
import ReservationsTrendChart from "../components/charts/ReservationsTrendChart";

export default function Stats() {
  return (
    <div className="h-screen overflow-y-scroll flex gap-4 grow flex-wrap bg-blue-100/50">
      <IncomingRevenueChart />
      <PredominantNationalitiesChart />
      <ReservationsTrendChart />
    </div>
  );
}
