const PDFDocument = require("pdfkit-table");
const Rezervare = require("../models/rezervareModel");

exports.RevenueRaport = async (req, res) => {
  const year = 2025;

  const data = await Rezervare.aggregate([
    {
      $match: {
        dataCheckIn: {
          $gte: new Date(year, 0, 2),
          $lt: new Date(parseInt(year) + 1, 0, 2),
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

  const doc = new PDFDocument({ margin: 30, size: "A4" });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=raport.pdf");
  doc.pipe(res);

  doc.fontSize(25).text("Raport");

  const rows = data.map((rez) => [
    rez.nume,
    rez.dataCheckIn?.toISOString().split("T")[0] || "-",
    rez.dataCheckOut?.toISOString().split("T")[0] || "-",
    `${rez.suma} RON`,
  ]);

  const table = {
    title: "Venituri",
    headers: ["Client", "Data Check-In", "Data Check-Out", "Total RON"],
    rows: rows,
  };

  const tableOptions = {
    width: doc.page.width - 60,
    columnsSize: [150, 120, 120, 120],
    prepareHeader: () => {
      doc.font("Helvetica-Bold").fontSize(10).fillColor("#FFFFFF");
    },
    prepareRow: (row, indexColumn, indexRow, rectRow) => {
      doc.font("Helvetica").fontSize(10);
      if (indexRow % 2 === 0) {
        doc.addBackground(rectRow, "#F3F4F6", 1);
      }
      doc.fillColor("#000000");
    },
    divider: {
      horizontal: { width: 0.5, color: "#E5E7EB" },
      vertical: { width: 0.5, color: "#E5E7EB" },
    },
    padding: 5,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  };

  doc.moveDown();

  if (rows.length === 0) {
    doc
      .moveDown()
      .fontSize(12)
      .text("Nu sunt rezultate disponibile pentru acest an.");
  } else {
    await doc.table(table, tableOptions);
  }

  doc.end();
};
