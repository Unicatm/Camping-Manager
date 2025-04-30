import PricesListWidget from "./components/widgets/PricesListWidget";
import FreeSpacesWidget from "../Reservations/widgets/FreeSpacesWidget";
import AverageDaysSpentWidget from "../Reservations/widgets/AverageDaysSpentWidget";
import { getRevenueRaport } from "../../api/pdfsApi";

export default function Home() {
  const handleOpenPdf = async () => {
    try {
      const response = await getRevenueRaport();

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "raport.pdf";
      link.click();
    } catch (error) {
      console.error("Eroare la descărcarea PDF-ului:", error);
    }
  };
  return (
    <div className="h-screen grow bg-blue-100/50">
      <div className="relative w-11/12 h-full mx-auto py-8 flex flex-col">
        <FreeSpacesWidget width={"w-fit"} />
        <AverageDaysSpentWidget width={"w-fit"} />
        <PricesListWidget />
        <button className="bg-blue-200 p-4" onClick={handleOpenPdf}>
          Deschide PDF
        </button>
      </div>
    </div>
  );
}
