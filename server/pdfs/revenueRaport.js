const PDFDocument = require("pdfkit-table");
const Rezervare = require("../models/rezervareModel");

exports.RevenueRaport = async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).send("Datele de început și sfârșit sunt necesare.");
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  const data = await Rezervare.aggregate([
    {
      $match: {
        dataCheckIn: {
          $gte: start,
          $lte: end,
        },
      },
    },
    {
      $lookup: {
        from: "clients",
        localField: "idClient",
        foreignField: "_id",
        as: "client",
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{ $arrayElemAt: ["$client", 0] }, "$$ROOT"],
        },
      },
    },
    {
      $project: {
        client: 0,
        _id: 0,
      },
    },
    {
      $project: {
        nume: 1,
        dataCheckIn: 1,
        dataCheckOut: 1,
        suma: 1,
      },
    },
  ]);

  const reportTitle = `Raport Venituri`;
  const periodTitle = `Raport venituri ${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  const totalRevenue = data.reduce((sum, rez) => sum + (rez.suma || 0), 0);

  const doc = new PDFDocument({ margin: 30, size: "A4", bufferPages: true });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `inline; filename="Raport_Venituri_${
      start || moment().format("YYYY-MM-DD")
    }-${end || moment().format("YYYY-MM-DD")}.pdf"`
  );
  doc.pipe(res);

  doc
    .fillColor("#000000")
    .fontSize(20)
    .text(reportTitle, { align: "center" })
    .moveDown(0.5);

  doc.moveDown(2);

  doc
    .font("Helvetica-Bold")
    .fillColor("#000000")
    .fontSize(10)
    .text(periodTitle)
    .moveDown(1);

  const table = {
    headers: [
      {
        label: "Client",
        property: "client",
        width: 180,
        renderer: (value) => value || "-",
      },
      {
        label: "Data Check-In",
        property: "checkIn",
        width: 100,
      },
      {
        label: "Data Check-Out",
        property: "checkOut",
        width: 100,
      },
      {
        label: "Total RON",
        property: "suma",
        width: 120,
        align: "right",
      },
    ],
    datas: [
      ...data.map((rez) => ({
        client: rez.nume,
        checkIn: rez.dataCheckIn?.toISOString().split("T")[0] || "-",
        checkOut: rez.dataCheckOut?.toISOString().split("T")[0] || "-",
        suma: `${rez.suma} RON`,
        options: {
          fontSize: 9,
          separation: true,
        },
      })),
      {
        client: {
          label: "TOTAL GENERAL",
          options: {
            colSpan: 3,
            font: "Helvetica-Bold",
            alignment: "right",
          },
        },
        suma: {
          label: `${totalRevenue.toFixed(2)} RON`,
          options: {
            font: "Helvetica-Bold",
            alignment: "right",
          },
        },
      },
    ],
  };

  const tableOptions = {
    width: doc.page.width - 60,
    columnsSize: [150, 150, 150, 120],
    prepareHeader: () => {
      doc.font("Helvetica-Bold").fontSize(10).fillColor("#000000");
      return doc;
    },
    prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
      doc.font("Helvetica").fontSize(8).fillColor("#000000");
    },
    divider: {
      horizontal: { width: 0.1, color: "#94a3b8" },
    },
    padding: 8,
    headerBackground: "#60a5fa",
  };

  doc.table(table, tableOptions);

  doc.end();
};
