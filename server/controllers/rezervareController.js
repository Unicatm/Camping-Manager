const Rezervare = require("../models/rezervareModel");
const APIFeatures = require("./../utils/apiFeatures");

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
