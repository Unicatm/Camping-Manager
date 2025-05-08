const Facilitate = require("../models/facilitateModel");
const APIFeatures = require("./../utils/apiFeatures");

exports.getFacilitate = async (req, res) => {
  try {
    const facilitate = await Facilitate.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        facilitate,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getAllFacilitati = async (req, res) => {
  try {
    const features = new APIFeatures(
      Facilitate.find().sort({ _id: -1 }),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const facilitati = await features.query;

    res.status(200).json({
      status: "success",
      results: facilitati.length,
      data: {
        facilitati,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getTipuriAuto = async (req, res) => {
  try {
    const features = new APIFeatures(Facilitate.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const facilitati = await features.query;

    const tipuriAuto = facilitati
      .filter(
        (facilitate) =>
          ![
            "Masina de spalat",
            "Copii 3-12 ani",
            "Copii 0-3 ani",
            "Adult",
          ].includes(facilitate.denumire)
      )
      .map((facilitate) => facilitate.denumire);

    res.status(200).json({
      status: "success",
      results: tipuriAuto.length,
      data: {
        tipuriAuto,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.createFacilitate = async (req, res) => {
  try {
    const newFacilitate = await Facilitate.create(req.body);

    res.status(201).json({
      status: "succes",
      data: {
        newFacilitate,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.updateFacilitate = async (req, res) => {
  try {
    const updateFacilitate = await Facilitate.findByIdAndUpdate(
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
        facilitate: updateFacilitate,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.deleteFacilitate = async (req, res) => {
  try {
    await Facilitate.findByIdAndDelete(req.params.id, req.body);
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
