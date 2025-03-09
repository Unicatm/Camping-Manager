import dateFormatter from "../../utils/dateFormat";

const rezervariData = (rezervare) => {
  [
    {
      id: rezervare.id,
      idClient: rezervare.idClient,
      dataCheckIn: dateFormatter(rezervare.dataCheckIn),
      dataCheckOut: dateFormatter(rezervare.dataCheckOut),
      nrAdulti: rezervare.facilitati["Adulti"] || "0",
      nrCopii: rezervare.facilitati["Copii"] || "0",
      hasElectricity: rezervare.hasElectricity ? "Da" : "Nu",
      tipAuto: rezervare.tipAuto.map((tip, idx) => <div key={idx}>{tip}</div>),
    },
  ];
};

export default rezervariData;
