import Joi from "joi";

export const notesValidation = Joi.object({
  tripId: Joi.string().required(),
  content: Joi.string().required(),
});
