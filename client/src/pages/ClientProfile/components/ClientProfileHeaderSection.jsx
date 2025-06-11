import React from "react";
import HeaderSection from "../../../components/headerSection/HeaderSection";
import ExportButton from "../../../components/ui/buttons/ExportButton";
import { getClientRaport } from "../../../api/pdfsApi";

export default function ClientProfileHeaderSection({ id }) {
  const handleOpenPdf = async () => {
    try {
      console.log(id);
      const response = await getClientRaport(id);

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `raport_client_${id}.pdf`;
      link.click();
    } catch (error) {
      console.error("Eroare la descărcarea PDF-ului:", error);
    }
  };

  return (
    <HeaderSection
      title="Profil client"
      subtitle="Vizualizează și gestionează informațiile clienților"
    >
      <ExportButton onClickHandler={handleOpenPdf} />
    </HeaderSection>
  );
}
