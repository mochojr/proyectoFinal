import dotenv from 'dotenv'
import { usuarioRoutes } from './routes/usuariosRouter.js'
import errorHandler from './middlewares/errorHandler.js'
import express from 'express'
import cors from 'cors'
import { autentificacionRoutes } from './routes/autentificacionRouter.js'
import { expressjwt as jwt } from 'express-jwt'

dotenv.config()

const SERVER_PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

const whileList = ['http://localhost:5173', 'http://localhost:3000']

app.use(cors({ origin: whileList }))

app.use(
  jwt({
    secret: process.env.SECRET_KEY,
    algorithms: ['HS256']
  }).unless({
    path: [
      '/api/autentificacion/login',
      '/api/autentificacion/register'
    ]
  })
)

app.use('/api', autentificacionRoutes(), usuarioRoutes())

app.use(errorHandler)

app.listen(SERVER_PORT, () => {
  console.log('Servidor escuchando en http://localhost:3000')
})
