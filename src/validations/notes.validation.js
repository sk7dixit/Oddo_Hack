import Joi from "joi";

export const notesValidation = Joi.object({
  tripId: Joi.string().required(),
  content: Joi.string().required(),
  mood: Joi.string().optional(),
  location: Joi.string().optional(),
  imageUrl: Joi.string().optional().allow(""),
  coverUrl: Joi.string().optional().allow(""),
  weather: Joi.string().optional(),
  isOptimistic: Joi.any().optional(), // Allow frontend flags
  _id: Joi.any().optional(),
  createdAt: Joi.any().optional()
});
