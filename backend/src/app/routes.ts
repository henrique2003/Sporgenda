import { Router } from 'express'
import ScheduleController from './controllers/ScheduleController'
import UserController from './controllers/UserController'
import { auth } from './middlewares/auth'

const { index, store, registerPeople, show, destroy } = ScheduleController
const { post, login, auth: authController } = UserController
const routes = Router()

routes.post('/agenda', auth, store)
routes.get('/agenda', index)
routes.get('/agenda/:id', show)
routes.put('/agenda/:id', registerPeople)
routes.delete('/agenda/:id', auth, destroy)

routes.post('/user', post)
routes.post('/login', login)
routes.get('/auth', auth, authController)

export default routes
