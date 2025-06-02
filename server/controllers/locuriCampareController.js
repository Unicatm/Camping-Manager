const LocuriCampare = require("../models/locuriCampareModel");
const Rezervare = require("../models/rezervareModel");

const APIFeatures = require("./../utils/apiFeatures");

exports.getLoc = async (req, res) => {
  try {
    const loc = await LocuriCampare.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        loc,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getAllLocuriCampare = async (req, res) => {
  try {
    const features = new APIFeatures(
      LocuriCampare.find().sort({ _id: 1 }),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const locuri = await features.query;

    res.status(200).json({
      status: "success",
      results: locuri.length,
      data: {
        locuri,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getTotalLocuriCampare = async (req, res) => {
  try {
    const spaces = await LocuriCampare.aggregate([
      { $group: { _id: null, total: { $sum: 1 } } },
    ]);

    res.status(200).json({
      status: "success",
      data: spaces,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getLocuriZi = async (req, res) => {
  try {
    const { zi } = req.query;

    const dataSelectata = zi ? new Date(zi) : new Date();
    dataSelectata.setHours(0, 0, 0, 0);
    const ziUrmatoare = new Date(dataSelectata);
    ziUrmatoare.setDate(ziUrmatoare.getDate() + 1);

    const locuri = await LocuriCampare.find();

    const rezervari = await Rezervare.find({
      dataCheckIn: { $lte: ziUrmatoare },
      dataCheckOut: { $gte: dataSelectata },
      status: "În curs",
    }).populate("idClient");

    const rezultat = locuri.map((loc) => {
      const rezervare = rezervari.find((r) => r.idLoc === loc._id);

      return {
        id: loc._id,
        status: rezervare
          ? rezervare.status === "Terminată"
            ? "Liber"
            : "Ocupat"
          : "Liber",
        idClient: rezervare?.idClient?._id || null,
        clientName: rezervare?.idClient?.nume || null,
        checkoutDate: rezervare?.dataCheckOut || null,
        hasElectricity: loc.hasElectricity,
      };
    });
    res.status(201).json({
      status: "succes",
      data: {
        rezultat,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getLocuriDisponibile = async (req, res) => {
  try {
    const { start, end, energie } = req.query;
    const startDate = new Date(start);
    const endDate = new Date(end);

    const rezervari = await Rezervare.find({
      $or: [
        { dataCheckIn: { $lte: endDate }, dataCheckOut: { $gte: startDate } },
      ],
    });

    const locuriRezervate = rezervari.map((r) => r.idLoc.toString());

    const filtre = {
      _id: { $nin: locuriRezervate },
    };
    if (energie !== undefined) {
      filtre.hasElectricity = energie === "true";
    }

    const locuriDisponibile = await LocuriCampare.find(filtre);

    res.status(200).json({
      status: "success",
      data: { locuri: locuriDisponibile },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.createLocuriCampare = async (req, res) => {
  try {
    const newLoc = await LocuriCampare.create(req.body);

    res.status(201).json({
      status: "succes",
      data: {
        newLoc,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.updateLocCampare = async (req, res) => {
  try {
    const updateLocCampare = await LocuriCampare.findByIdAndUpdate(
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
        locCampare: updateLocCampare,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.deleteLocCampare = async (req, res) => {
  try {
    await LocuriCampare.findByIdAndDelete(req.params.id, req.body);
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
