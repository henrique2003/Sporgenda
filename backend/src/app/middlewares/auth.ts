import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  const authHeaders = req.header('Authorization')

  if (!authHeaders) {
    return res.status(401).json('Invalid token')
  }

  try {
    const decoded = verify(authHeaders, 'sporgenda123') as { id: string }
    req.userId = decoded.id

    next()
  } catch (error) {
    return res.status(401).json('Invalid token')
  }
}
