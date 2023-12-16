import { Router } from 'express'
import { autentificacionController } from '../controllers/autentificacionController.js'

export const autentificacionRoutes = () => {
  const autentificacionRouter = Router()

  const { login, register } = autentificacionController()

  autentificacionRouter.route('/autentificacion/login')
    .post(login)

  autentificacionRouter.route('/autentificacion/register')
    .post(register)

  return autentificacionRouter
}
