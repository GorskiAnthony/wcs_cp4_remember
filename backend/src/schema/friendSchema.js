const joi = require("joi");

// Custom date format (YYYY-MM-DD)
const customDateFormat = /^\d{4}-\d{2}-\d{2}$/;

const friendSchema = joi.object({
  name: joi.string().min(3).max(255).required(),
  birthday: joi.string().pattern(customDateFormat).required().messages({
    "string.pattern.base": "Format de date non valide. Utiliser AAAA-MM-JJ.",
  }),
  be: joi.string().min(3).max(255).required(),
});

module.exports = friendSchema;
