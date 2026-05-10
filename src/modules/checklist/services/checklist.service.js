import mongoose from "mongoose";
import Checklist from "../models/checklist.model.js";
import { demoChecklist } from "../../../utils/demoData.js";

export const createChecklistService = async (data) => {
  try {
    if (mongoose.connection.readyState !== 1) return { ...data, _id: "temp_check" };
    return await Checklist.create(data);
  } catch (err) {
    return { ...data, _id: "temp_check" };
  }
};

export const getChecklistService = async (tripId) => {
  try {
    if (mongoose.connection.readyState !== 1) return { items: demoChecklist };
    const checklist = await Checklist.findOne({ tripId });
    return checklist || { items: demoChecklist };
  } catch (err) {
    return { items: demoChecklist };
  }
};

export const updateChecklistService = async (id, data) => {
  try {
    if (mongoose.connection.readyState !== 1) return { ...data, _id: id };
    return await Checklist.findByIdAndUpdate(id, data, { new: true });
  } catch (err) {
    return { ...data, _id: id };
  }
};
