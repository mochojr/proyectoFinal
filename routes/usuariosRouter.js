import { Router } from 'express'

import { usuarioController } from '../controllers/usuarioControllers.js'
import { usuarioValidation, usuarioParamValidation } from '../middlewares/validations.js'

export const usuarioRoutes = () => {
  const usuarioRouter = Router()
  const {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
  } = usuarioController()

  usuarioRouter.route('/usuarios')
    .get(getUsuarios)
    .post(/* usuarioValidation, */createUsuario)

  usuarioRouter.route('/usuarios/:id')
    .get(usuarioParamValidation, getUsuarioById)
    .put(usuarioParamValidation, usuarioValidation, updateUsuario)
    .delete(usuarioParamValidation, deleteUsuario)

  return usuarioRouter
}
