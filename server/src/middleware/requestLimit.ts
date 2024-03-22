import { NextFunction, Request, Response } from 'express'

type RequestRecord = {
  count: number
  startTime: number
}

const rateLimit = {
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 500, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
  requests: {} as Record<string, RequestRecord>,
}

// Cleanup mechanism
setInterval(() => {
  const now = Date.now()
  for (let ip in rateLimit.requests) {
    if (now - rateLimit.requests[ip].startTime > rateLimit.windowMs) {
      delete rateLimit.requests[ip]
    }
  }
}, rateLimit.windowMs)

function requestLimit(req: Request, res: Response, next: NextFunction) {
  const now = Date.now()
  const ip = req.ip

  if (!rateLimit.requests[ip]) {
    rateLimit.requests[ip] = { count: 1, startTime: now }
  } else if (now - rateLimit.requests[ip].startTime > rateLimit.windowMs) {
    rateLimit.requests[ip] = { count: 1, startTime: now }
  } else if (rateLimit.requests[ip].count < rateLimit.max) {
    rateLimit.requests[ip].count++
  } else {
    return res.status(429).send(rateLimit.message)
  }

  next()
}

export default requestLimit
