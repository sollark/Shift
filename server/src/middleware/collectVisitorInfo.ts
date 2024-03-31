import { NextFunction, Request, Response } from 'express'
import geoip from 'geoip-lite'
import { parseUserAgent } from '../lib/UserAgentParser.js'
import VisitorModel from '../mongo/models/visitor.model.js'
import { log } from '../service/console.service.js'
import logger from '../service/logger.service.js'
import { uuidService } from '../service/uuid.service.js'

// cookie for 365 days
const publicIdCookieOptions = {
  maxAge: 365 * 24 * 60 * 60 * 1000,
  sameSite: 'strict' as const,
  httpOnly: true,
  secure: true,
}

async function collectVisitorInfo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  log('collectVisitorInfo middleware')

  const ip = req.ip || ''
  const userAgent = req.headers['user-agent'] || ''
  const path = req.path

  // Get publicId from cookie or create a new one
  let publicId = req.cookies['publicId']
  if (!publicId) publicId = await uuidService.getVisitorUuid()
  res.cookie('publicId', publicId, publicIdCookieOptions)

  // Lookup IP address
  const geo = geoip.lookup(ip)

  // Visitor's device type
  let device = 'computer'
  if (/android|mobi/i.test(userAgent)) {
    device = 'mobile'
  } else if (/tablet/i.test(userAgent)) {
    device = 'tablet'
  } else if (/iphone|ipod|ipad/i.test(userAgent)) {
    device = 'iphone'
  } else if (/blackberry/i.test(userAgent)) {
    device = 'blackberry'
  } else if (/win/i.test(userAgent)) {
    device = 'windows_phone'
  } else if (/mac/i.test(userAgent)) {
    device = 'desktop'
  } else if (/linux/i.test(userAgent)) {
    device = 'linux_desktop'
  } else if (/tv/i.test(userAgent)) {
    device = 'tv'
  } else if (/watch/i.test(userAgent)) {
    device = 'watch'
  }

  let visitor = await VisitorModel.findOne({ publicId })
  if (!visitor) visitor = new VisitorModel({ publicId })

  // Parse user agent
  const userAgentInfo = parseUserAgent(userAgent)

  // Visitor's device info
  visitor.deviceInfo.device = device
  visitor.deviceInfo.os.name = userAgentInfo.os.name
  visitor.deviceInfo.os.version = userAgentInfo.os.version
  visitor.deviceInfo.browser.name = userAgentInfo.browser.name
  visitor.deviceInfo.browser.version = userAgentInfo.browser.version
  visitor.deviceInfo.browser.major = userAgentInfo.browser.major

  // Visitor's paths
  visitor.ips.push(ip)
  visitor.paths.push(path)
  visitor.timestamps.push(new Date())

  // Visitor's geodata
  visitor.geoInfo.country = geo?.country || ''
  visitor.geoInfo.city = geo?.city || ''
  await visitor.save()

  // Log visitor info
  logger.info('Visitor', ip, userAgent, device, geo?.country, geo?.city)

  next()
}

export default collectVisitorInfo
