const LocuriCampare = require("../models/locuriCampareModel");
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
    const features = new APIFeatures(LocuriCampare.find(), req.query)
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
