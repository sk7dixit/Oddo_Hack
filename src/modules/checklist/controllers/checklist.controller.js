import Checklist from "../models/checklist.model.js";

export const createChecklist = async (req, res) => {
  try {
    const { tripId, items } = req.body;

    const checklist = await Checklist.create({
      tripId,
      items,
    });

    res.status(201).json(checklist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getChecklist = async (req, res) => {
  try {
    const checklist = await Checklist.findOne({
      tripId: req.params.tripId,
    });

    res.status(200).json(checklist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateChecklist = async (req, res) => {
  try {
    const checklist = await Checklist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(checklist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
