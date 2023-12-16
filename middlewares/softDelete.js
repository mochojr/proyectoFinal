const addSoftDelete = async (params, next) => {
  try {
    if (params.action === 'delete') {
      params.action = 'update'
      params.args.data = { deletedAt: new Date() }
    }
    next(params)
  } catch (error) {
    next(error)
  }
}

export default addSoftDelete
