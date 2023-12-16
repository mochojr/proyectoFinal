import { usuarioBodySchema, usuarioParamSchema } from '../validation/usuarioSchemas.js'

export const usuarioValidation = (req, _res, next) => {
  const data = req.body
  const { error } = usuarioBodySchema.validate(data)
  error ? next(error) : next()
}

export const usuarioParamValidation = (req, _res, next) => {
  const params = req.params
  const { error } = usuarioParamSchema.validate(params)
  error ? next(error) : next()
}
