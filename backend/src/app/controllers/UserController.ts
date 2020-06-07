import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import { hash, compare } from 'bcrypt'
import User from '../models/User'

class UserController {
  public async post (req: Request, res: Response): Promise<Response> {
    try {
      req.body.password = await hash(req.body.password, 10)

      const user = await User.create(req.body)

      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json('Server Error')
    }
  }

  public async login (req: Request, res: Response): Promise<Response> {
    try {
      const { name, password } = req.body

      const user = await User.findOne({ name })

      if (!user) {
        return res.status(400).json('Usuário não encontrado')
      }

      if (!await compare(password, user.password)) {
        return res.status(400).json('Senha inválida')
      }

      const token = sign({ id: user.id }, 'sporgenda123', { expiresIn: 86400 })

      return res.status(200).json({ user, token })
    } catch (error) {
      console.log(error.message)
      return res.status(500).json('Server Error')
    }
  }

  public async auth (req: Request, res: Response): Promise<Response> {
    try {
      return res.status(204).json()
    } catch (error) {
      console.log(error.message)
      return res.status(500).json('Server Error')
    }
  }
}

export default new UserController()
