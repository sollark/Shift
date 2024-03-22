import { NextFunction, Request, Response } from 'express'

function setHeaders(req: Request, res: Response, next: NextFunction) {
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  )
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  //res.setHeader('Content-Security-Policy', "default-src 'self'") //render blocks static files with this header
  next()
}

export default setHeaders
