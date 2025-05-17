import React from "react";
import Map from "./Map";
import Map2 from "./Map2";
import HeaderSection from "../../components/headerSection/HeaderSection";

export default function CampingMap() {
  return (
    <div className="h-screen grow bg-blue-50/90">
      <div className="relative w-11/12 h-full mx-auto py-8 flex flex-col">
        <HeaderSection
          title="Hartă"
          subtitle="Vizualizează locurile din camping în timp real"
        />
        <Map />
        {/* <Map2 /> */}
      </div>
    </div>
  );
}
