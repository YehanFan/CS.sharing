const Joi = require("joi");

// Authentication validations

const email = Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: false } })
  .required()
  .messages({
    "string.base": "Email should be a string",
    "string.empty": "Email cannot be empty",
    "string.min": "Email should have a minimum length of {#limit}",
    "any.required": "Email is a required field.",
  });

const password = Joi.string().min(8).max(80).required().messages({
  "string.base": "Password should be a string",
  "string.empty": "Password cannot be empty",
  "string.min": "Password should have a minimum length of {#limit}",
  "any.required": "Password is a required field",
});

const username = Joi.string().min(2).max(32).required().messages({
  "string.base": "Username should be a string",
  "string.empty": "Username cannot be empty",
  "string.min": `Username should have a minimum length of {#limit}`,
  "any.required": "Username is a required field",
});

// Post validations

const title = Joi.string().required().messages({
  "string.base": "Title should be a string",
  "string.empty": "Title cannot be empty",
  "any.required": "Title is a required field",
});

const content = Joi.string().required().messages({
  "string.base": "Content should be a string",
  "any.required": "Content is a required field",
});

const photo = Joi.string().messages({
  "object.base": "Photo should be a string",
});

// Profile validations

const bio = Joi.string().empty('');

const validations = {
  loginSchema: Joi.object()
    .keys({
      email,
      password,
    })
    .options({ abortEarly: false }),
  registerSchema: Joi.object()
    .keys({
      email,
      username,
      password,
    })
    .options({ abortEarly: false }),
  createPostSchema: Joi.object().keys({
    title,
    content,
    photo
  }),
  updateUserInfoSchema: Joi.object().keys({
    bio,
  }),
};

function validateRequest(schema) {
  return (req, res, next) => {
    const validation = schema.validate(req.body);

    if (validation.error) {
      console.log(validation.error);
      res.status(400);
      throw new Error(validation.error.details[0].message);
    } else {
      if (!req.value) {
        req.value = {};
      }

      req.value["body"] = res.value;
      next();
    }
  };
}

module.exports = { validations, validateRequest };
