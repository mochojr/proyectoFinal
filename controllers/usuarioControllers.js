import httpStatus from '../helpers/httpStatus.js'
import prisma from '../database/prisma.js'
import addSoftDelete from '../middlewares/softDelete.js'
import bcrypt from 'bcrypt'

export const usuarioController = () => {
  const createUsuario = async (req, res, next) => {
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

  const getUsuarios = async (_req, res, next) => {
    try {
      const usuarios = await prisma.usuarios.findMany({
        where: {
          deletedAt: null
        }
      })

      return res.status(httpStatus.OK).json(usuarios)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getUsuarioById = async (req, res, next) => {
    const { id } = req.params

    try {
      const usuario = await prisma.usuarios.findFirst({
        where: {
          id: Number(id),
          deletedAt: null
        }
      })

      return res.status(httpStatus.OK).json(usuario)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updateUsuario = async (req, res, next) => {
    const { id } = req.params
    const { genero, firstName, lastName, address, nickName, email, password, birthday } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    try {
      await prisma.usuarios.update({
        where: {
          id: Number(id)
        },
        data: {
          genero,
          firstName,
          lastName,
          address,
          nickName,
          email,
          password: hashedPassword,
          birthday: new Date(birthday)
        }
      })

      return res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: 'Usuario actualizado correctamente'
      })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const deleteUsuario = async (req, res, next) => {
    const { id } = req.params

    try {
      prisma.$use(addSoftDelete)
      await prisma.usuarios.delete({
        where: {
          id: Number(id)
        }
      })

      return res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: 'Usuario eliminado correctamente'
      })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return {
    createUsuario,
    getUsuarios,
    getUsuarioById,
    updateUsuario,
    deleteUsuario
  }
}
