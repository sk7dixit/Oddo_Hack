import {
  createChecklistService,
  getChecklistService,
  updateChecklistService,
} from "../services/checklist.service.js";

export const createChecklist = async (req, res) => {
  try {
    const checklist = await createChecklistService(req.body);

    res.status(201).json({
      success: true,
      data: checklist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getChecklist = async (req, res) => {
  try {
    const checklist = await getChecklistService(req.params.tripId);

    res.status(200).json({
      success: true,
      data: checklist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateChecklist = async (req, res) => {
  try {
    const checklist = await updateChecklistService(req.params.id, req.body);

    res.status(200).json({
      success: true,
      data: checklist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
