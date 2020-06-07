import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { connect } from 'mongoose'
import routes from './app/routes'
import { config } from 'dotenv'
config()

class App {
  public readonly express: express.Application

  constructor () {
    this.express = express()
    this.database()
    this.middlewares()
  }

  middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(helmet())
    this.express.use('/api', routes)
  }

  async database (): Promise<void> {
    try {
      await connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })

      console.log('MongoDb connect')
    } catch (error) {
      console.log('error ao conectar com mongodb')
      console.error(error.message)
      process.exit(1)
    }
  }
}

export default new App().express
