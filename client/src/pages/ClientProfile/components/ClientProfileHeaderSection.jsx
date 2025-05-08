import React from "react";
import HeaderSection from "../../../components/headerSection/HeaderSection";
import ExportButton from "../../../components/ui/buttons/ExportButton";

export default function ClientProfileHeaderSection() {
  return (
    <HeaderSection
      title="Profil client"
      subtitle="Vizualizează și gestionează informațiile clienților"
    >
      <ExportButton handleOpenPdf={""} />
    </HeaderSection>
  );
}
