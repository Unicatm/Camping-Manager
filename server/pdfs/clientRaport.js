const PDFDocument = require("pdfkit-table");
const { getClientReservations } = require("../../client/src/api/clientApi");
const { default: dateFormatter } = require("../../client/src/utils/dateFormat");

exports.ClientRaport = async (req, res) => {
  try {
    const doc = new PDFDocument({ margin: 30 });
    const client = await getClientReservations(req.params.id);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=raport_client_${client?.nume}.pdf`
    );

    doc.pipe(res);

    doc
      .fontSize(18)
      .text(`Raport Client – ${client?.nume}`, { align: "center" })
      .moveDown();

    doc
      .fontSize(12)
      .text("Informatii Client", { underline: true })
      .moveDown(0.5);
    doc.text(`ID Client: ${client?.cnp}`);
    doc.text(`Nationalitate: ${client?.nationalitate}`);
    doc.text(`Data nasterii: ${dateFormatter(client?.dataNasterii)}`);
    doc.text(`Email: ${client.email}`).moveDown();

    doc.fontSize(12).text("Statistici", { underline: true }).moveDown(0.5);
    doc.text(`Numar rezervari: ${client.rezervari.length}`);
    doc.text(`Medie zile campate: 3 zile`);
    doc.text(`Cheltuieli totale: 945 lei`).moveDown();

    doc.fontSize(12).text("Istoric Rezervari", { underline: true }).moveDown(2);

    const table = {
      headers: [
        "Loc",
        "Status",
        "Check-In",
        "Check-Out",
        "Persoane",
        "Facilitati",
        "Total",
        "Pe zi",
      ],
      rows: client.rezervari.map((r) => [
        r.idLoc,
        r.status,
        dateFormatter(r.dataCheckIn),
        dateFormatter(r.dataCheckOut),
        [
          `${r?.facilitati["Adult"] || 0} Adulti`,
          `${r?.facilitati["Copii 3-12 ani"] || 0} Copii`,
        ].join("\n"),
        Object.entries(r?.tipAuto || {}).map(
          ([key, value]) => `${key}: ${value}`
        ),
        `${r.suma} lei`,
        `${r.sumaPerDay} lei`,
      ]),
    };

    await doc.table(table, {
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
      prepareRow: () => doc.font("Helvetica").fontSize(10),
      columnSpacing: 10,
      padding: 5,
    });

    doc.moveDown(2);
    doc
      .fontSize(10)
      .text(`Generat la: ${new Date().toLocaleDateString("ro-RO")}`, {
        align: "right",
      });

    doc.end();
  } catch (err) {
    console.error("Eroare la generarea raportului:", err);
    res.status(500).json({ message: "Eroare la generarea PDF-ului" });
  }
};
