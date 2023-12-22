import httpStatus from '../helpers/httpStatus.js'
import prisma from '../database/prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const autentificacionController = () => {
  const register = async (req, res, next) => {
    const { genero, firstName, lastName, email, address, nickName, password, birthday } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    try {
      const usuario = await prisma.usuarios.create({
        data: {
          genero,
          firstName,
          lastName,
          email,
          address,
          nickName,
          password: hashedPassword,
          birthday: new Date(birthday)
        }
      })
      return res.status(httpStatus.CREATED).json({
        status: httpStatus.CREATED,
        message: 'Usuario creado correctamente',
        usuario
      })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const login = async (req, res, next) => {
    try {
      const { password, email } = req.body

      const usuario = await prisma.usuarios.findUnique({
        where: {
          email
        }
      })

      if (!usuario) {
        return res.status(httpStatus.NOT_FOUND).json({ message: 'credenciales invalidas' })
      }

      const isValidPassword = await bcrypt.compare(password, usuario.password)

      if (!isValidPassword) {
        return res.status(httpStatus.NOT_FOUND).json({ message: 'credenciales invalidas' })
      }
      const token = jwt.sign({
        name: usuario.firstName
      }, process.env.SECRET_KEY, { expiresIn: '10h' })

      return res.status(httpStatus.OK).json({
        message: 'Logeado correctamente',
        token
      })
    } catch (error) {
      next(error)
    }
  }
  return { login, register }
}
