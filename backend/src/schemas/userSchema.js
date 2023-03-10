const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
  repeatPassword: Joi.ref("password"),
  height: Joi.number().min(0).max(300).required(),
});

module.exports = userSchema;
