const Joi = require("joi");

const formSchema = Joi.object({
  photo: Joi.string().required(),
  poids: Joi.number().required(),
  poitrine: Joi.optional().allow(null),
  hanche: Joi.optional().allow(null),
  cuisse: Joi.optional().allow(null),
  bras: Joi.optional().allow(null),
});

module.exports = formSchema;
