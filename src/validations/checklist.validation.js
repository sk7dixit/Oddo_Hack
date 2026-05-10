import Joi from "joi";

export const checklistValidation = Joi.object({
  tripId: Joi.string().required(),
  items: Joi.array().items(
    Joi.object({
      text: Joi.string().required(),
      packed: Joi.boolean(),
    })
  ),
});
