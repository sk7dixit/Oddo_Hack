import Checklist from "../models/checklist.model.js";

export const createChecklistService = async (data) => {
  return await Checklist.create(data);
};

export const getChecklistService = async (tripId) => {
  return await Checklist.findOne({ tripId });
};

export const updateChecklistService = async (id, data) => {
  return await Checklist.findByIdAndUpdate(id, data, {
    new: true,
  });
};
