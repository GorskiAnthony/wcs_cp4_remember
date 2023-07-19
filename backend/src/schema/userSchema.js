const joi = require("joi");

const userSchema = joi.object({
  name: joi.string().min(3).max(255).required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .min(8)
    .max(255)
    .regex(/^(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/)
    .message(
      "Le mot de passe doit comporter au moins 8 caractères, une lettre majuscule et un caractère spécial (@#$%^&+= !)."
    )
    .required(),
  confirmPassword: joi
    .string()
    .valid(joi.ref("password"))
    .messages({ "any.only": "Les mots de passe ne correspondent pas." })
    .required(),
});

module.exports = userSchema;
