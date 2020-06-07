import { Request, Response } from 'express'
import Schedule from '../models/Schedule'

class ScheduleController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const schedule = await Schedule.find({})

      return res.status(200).json(schedule)
    } catch (error) {
      return res.status(500).json('Server Error')
    }
  }

  public async store (req: Request, res: Response): Promise<Response> {
    try {
      const { day, month, time, location, title } = req.body

      const fields = ['day', 'month', 'time', 'location', 'title']
      for (const field of fields) {
        if (typeof req.body[field] === 'string') {
          req.body[field] = req.body[field].trim()
        }
      }

      if (!day || !time || !month || !location || !title) {
        return res.status(400).json('Campo em branco')
      }

      if (parseInt(day) < 1 || parseInt(day) > 31) {
        return res.status(400).json('Dia inválido')
      }

      const schedule = await Schedule.create(req.body)

      return res.status(200).json(schedule)
    } catch (error) {
      console.log(error.message)
      return res.status(500).json('Server Error')
    }
  }

  public async show (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(400).json('Necessário Id')
      }

      const schedule = await Schedule.findById(id)

      if (!schedule) {
        return res.status(400).json('Não encontrado')
      }

      return res.status(200).json(schedule)
    } catch (error) {
      return res.status(500).json('Server Error')
    }
  }

  public async registerPeople (req: Request, res: Response): Promise<Response> {
    try {
      const { body, params } = req
      const { id } = params

      if (!body.name) {
        return res.status(400).json('Campo em branco')
      }

      const lastSchedule = await Schedule.findById(id)
      lastSchedule.users.push(body.name)

      const schedule = await Schedule.findByIdAndUpdate({
        _id: id
      }, {
        $set: lastSchedule
      }, {
        upsert: true
      })

      return res.status(200).json(schedule)
    } catch (error) {
      console.log(error.message)
      return res.status(500).json('Server Error')
    }
  }

  public async destroy (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(400).json('Necessário Id')
      }

      await Schedule.findByIdAndDelete(id)

      return res.status(204).json()
    } catch (error) {
      return res.status(500).json('Server Error')
    }
  }
}

export default new ScheduleController()
