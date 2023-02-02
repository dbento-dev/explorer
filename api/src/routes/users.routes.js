const { Router } = require('express')
const UserController = require('../controllers/UsersController')
const usersRoutes = Router()

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const userController = new UserController()

usersRoutes.post('/', userController.create)
usersRoutes.put('/', ensureAuthenticated, userController.update)

module.exports = usersRoutes
