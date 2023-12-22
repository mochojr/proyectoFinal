import Joi from 'joi'

export const usuarioBodySchema = Joi.object({

  genero: Joi.string()
    .min(3)
    .trim()
    .regex(/[a-zA-Z]/)
    .required(),
  first_name: Joi.string()
    .min(3)
    .regex(/[a-zA-Z]/)
    .required(),
  last_name: Joi.string()
    .min(3)
    .regex(/[a-zA-Z]/)
    .required(),
  email: Joi.string()
    .min(3)
    .regex(/[a-zA-Z]/)
    /* .email
     ({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }) */
    .required(),
  address: Joi.string()
    .min(3)
    .required(),
  nickName: Joi.string()
    .min(3)
    .required(),
  password: Joi.string()
    .min(3)
    .pattern(/^[a-zA-Z0-9]{3,30}$/),
  birthday: Joi.number()
    .integer()
    .min(1900)
    .max(2013)
})

export const usuarioParamSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9]+$/, 'numbers')
})
