const Rezervare = require("../models/rezervareModel");
const APIFeatures = require("./../utils/apiFeatures");

const monthsMap = {
  1: "Ian",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "Mai",
  6: "Iun",
  7: "Iul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

exports.getRezervare = async (req, res) => {
  try {
    const rezervare = await Rezervare.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        rezervare,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getRezervariByClientId = async (req, res) => {
  try {
    const rezervari = await Rezervare.find({ idClient: req.params.idClient });
    res.status(200).json({
      status: "success",
      data: {
        rezervari,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getTopPredominantNationalitiesByYear = async (req, res) => {
  try {
    const year = req.params.year;

    const nationalitati = await Rezervare.aggregate([
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
          nationalitate: 1,
        },
      },
      {
        $group: {
          _id: "$nationalitate",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        year,
        nationalitati,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getAllAvailableYears = async (req, res) => {
  try {
    const years = await Rezervare.aggregate([
      {
        $group: {
          _id: { $year: "$dataCheckIn" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: { years: years.map((year) => year._id) },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getMonthlyReservationsOnSelectedYears = async (req, res) => {
  try {
    const years = req.query.years?.split(",").map(Number);

    const monthlyReservations = await Rezervare.aggregate([
      {
        $match: {
          $expr: { $in: [{ $year: "$dataCheckIn" }, years] },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$dataCheckIn" },
            month: { $month: "$dataCheckIn" },
          },
          numarRezervari: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    const formattedData = Object.values(monthsMap).map((monthName) => {
      let entry = { month: monthName };
      years.forEach((year) => {
        entry[year] = 0;
      });
      return entry;
    });

    monthlyReservations.forEach(({ _id, numarRezervari }) => {
      const { year, month } = _id;
      const monthName = monthsMap[month];

      const monthIndex = month - 1;
      if (formattedData[monthIndex]) {
        formattedData[monthIndex][year] = numarRezervari;
      }
    });

    res.status(200).json({
      status: "success",
      data: formattedData,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getIncomingRevenueOnSelectedYears = async (req, res) => {
  try {
    const years = req.query.years?.split(",").map(Number);

    const monthlyReservations = await Rezervare.aggregate([
      {
        $match: {
          $expr: { $in: [{ $year: "$dataCheckIn" }, years] },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$dataCheckIn" },
            month: { $month: "$dataCheckIn" },
          },
          totalRevenue: { $sum: "$suma" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    const formattedData = Object.values(monthsMap).map((monthName) => {
      let entry = { month: monthName };
      years.forEach((year) => {
        entry[year] = 0;
      });
      return entry;
    });

    monthlyReservations.forEach(({ _id, totalRevenue }) => {
      const { year, month } = _id;
      const monthName = monthsMap[month];

      const monthIndex = month - 1;
      if (formattedData[monthIndex]) {
        formattedData[monthIndex][year] = totalRevenue;
      }
    });

    res.status(200).json({
      status: "success",
      data: formattedData,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getAgeGroups = async (req, res) => {
  try {
    const year = req.params.year;

    const ageGroups = await Rezervare.aggregate([
      {
        $lookup: {
          from: "clients",
          localField: "idClient",
          foreignField: "_id",
          as: "clientInfo",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$clientInfo", 0] }, "$$ROOT"],
          },
        },
      },
      {
        $match: {
          dataCheckIn: {
            $gte: new Date(`${year}-01-01`),
            $lt: new Date(`${year + 1}-01-01`),
          },
        },
      },
      {
        $project: {
          _id: 0,
          dataCheckIn: 1,
          dataNasterii: 1,
          monthIndex: 1,
        },
      },
      {
        $addFields: {
          age: {
            $dateDiff: {
              startDate: {
                $toDate: "$dataNasterii",
              },
              endDate: "$$NOW",
              unit: "year",
            },
          },
          monthIndex: { $month: "$dataCheckIn" },
        },
      },
      {
        $project: {
          dataNasterii: 0,
        },
      },
      {
        $group: {
          _id: {
            month: "$monthIndex",
            ageGroup: {
              $switch: {
                branches: [
                  { case: { $lt: ["$age", 25] }, then: "18-25" },
                  { case: { $lt: ["$age", 35] }, then: "25-35" },
                  { case: { $lt: ["$age", 55] }, then: "35-55" },
                  { case: { $lt: ["$age", 75] }, then: "55-75" },
                ],
                default: "75+",
              },
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.month",
          ageGroups: {
            $push: {
              ageGroup: "$_id.ageGroup",
              count: "$count",
            },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    let completeData = Object.keys(monthsMap).map((monthIndex) => {
      return {
        month: monthsMap[monthIndex],
        "18-25": 0,
        "25-35": 0,
        "35-55": 0,
        "55-75": 0,
        "+75": 0,
      };
    });

    ageGroups.forEach((entry) => {
      const monthIndex = entry._id;
      const monthName = monthsMap[monthIndex];

      let monthData = completeData.find((item) => item.month === monthName);

      entry.ageGroups.forEach((group) => {
        monthData[group.ageGroup] = group.count;
      });
    });

    res.status(200).json({
      status: "success",
      data: completeData,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getAllRezervari = async (req, res) => {
  try {
    const features = new APIFeatures(
      Rezervare.find().populate({
        path: "idClient",
        select: "nume",
      }),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    let rezervari = await features.query;

    rezervari = rezervari.map((rezervare) => {
      return {
        ...rezervare.toObject(),
        idClient: rezervare.idClient._id,
        numeClient: rezervare.idClient.nume,
      };
    });

    res.status(200).json({
      status: "success",
      results: rezervari.length,
      data: {
        rezervari,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.createRezervare = async (req, res) => {
  try {
    const newRezervare = await Rezervare.create(req.body);

    res.status(201).json({
      status: "succes",
      data: {
        newRezervare,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.updateRezervare = async (req, res) => {
  try {
    const updateRezervare = await Rezervare.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "succes",
      data: {
        rezervare: updateRezervare,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.deleteRezervare = async (req, res) => {
  try {
    await Rezervare.findByIdAndDelete(req.params.id, req.body);
    res.status(200).json({
      status: "succes",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
