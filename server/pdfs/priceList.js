const PDFDocument = require("pdfkit-table");
const Facilitate = require("../models/facilitateModel");

exports.PriceListExport = async (req, res) => {
  const prices = await Facilitate.find();

  const reportTitle = `Lista Preturi`;
  const margin = 30;
  const doc = new PDFDocument({
    margin: margin,
    size: "A4",
    bufferPages: true,
  });

  doc
    .fillColor("#000000")
    .fontSize(20)
    .text(reportTitle, { align: "center" })
    .moveDown(0.5);

  doc.moveDown(2);

  const table = {
    headers: [
      {
        label: "Denumire",
        property: "denumire",
        width: 170,
      },
      {
        label: "Pret",
        property: "pret",
        width: 50,
      },
    ],
    datas: [
      ...prices.map((rez) => ({
        denumire: rez.denumire,
        pret: rez.pret + " lei",
      })),
    ],
  };

  const tableOptions = {
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

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename="Lista_Preturi"`);
  doc.pipe(res);
};
