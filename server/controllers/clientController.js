const mongoose = require("mongoose");
const Client = require("../models/clientModel");
const APIFeatures = require("./../utils/apiFeatures");
const dayjs = require("dayjs");

exports.getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        client,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getClientWithReservations = async (req, res) => {
  try {
    const clientId = new mongoose.Types.ObjectId(req.params.clientId);

    const clientsWithReservations = await Client.aggregate([
      {
        $match: {
          _id: clientId,
        },
      },
      {
        $lookup: {
          from: "rezervares",
          localField: "_id",
          foreignField: "idClient",
          as: "rezervari",
        },
      },
      {
        $project: {
          updatedAt: 0,
          __v: 0,
          _id: 0,
        },
      },
    ]);

    if (clientsWithReservations.length === 0) {
      return res.status(404).json({
        status: "failed",
        message: "Client not found.",
      });
    }

    res.status(200).json({
      status: "success",
      data: clientsWithReservations,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getAllClients = async (req, res) => {
  try {
    const features = new APIFeatures(Client.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const clients = await features.query;

    res.status(200).json({
      status: "success",
      results: clients.length,
      data: {
        clients,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getClientsNameAndCnp = async (req, res) => {
  try {
    const data = await Client.aggregate([
      {
        $project: {
          _id: 1,
          nume: 1,
          cnp: 1,
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getClientGrowthData = async (req, res) => {
  try {
    const currentMonth = new Date();
    const lastMonth = dayjs(currentMonth).subtract(1, "month").toDate();

    const data = await Client.aggregate([
      {
        $match: {
          createdAt: {
            $gte: dayjs(lastMonth).startOf("month").toDate(),
            $lte: dayjs(currentMonth).endOf("month").toDate(),
          },
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          count: { $sum: 1 },
        },
      },
    ]);

    const totalClients = await Client.countDocuments();

    const currentMonthNumber = currentMonth.getMonth() + 1;
    const lastMonthNumber =
      currentMonthNumber === 1 ? 12 : currentMonthNumber - 1;

    const currentMonthClients =
      data.find((d) => d._id === currentMonthNumber)?.count || 0;
    const lastMonthClients =
      data.find((d) => d._id === lastMonthNumber)?.count || 0;

    const changeValue = currentMonthClients - lastMonthClients;
    const changePercentage =
      lastMonthClients === 0
        ? 100
        : Math.round((changeValue / lastMonthClients) * 100);

    res.status(200).json({
      status: "success",
      data: {
        total: totalClients,
        changeValue,
        changePercentage,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.createClient = async (req, res) => {
  try {
    const newClient = await Client.create(req.body);

    res.status(201).json({
      status: "succes",
      data: {
        newClient,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(
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
        client: updatedClient,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id, req.body);
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
