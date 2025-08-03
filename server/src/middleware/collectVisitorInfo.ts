import { NextFunction, Request, Response } from "express";
import geoip from "geoip-lite";
import { parseUserAgent } from "../lib/UserAgentParser.js";
import VisitorModel from "../mongo/models/visitor.model.js";
import { asyncLocalStorage } from "../service/als.service.js";
import { log } from "../service/console.service.js";
import logger from "../service/logger.service.js";
import { uuidService } from "../service/uuid.service.js";

// Cookie for 365 days
const publicIdCookieOptions = {
  maxAge: 365 * 24 * 60 * 60 * 1000,
  sameSite: "strict" as const,
  secure: true,
  httpOnly: true,
};

/**
 * Device type detection patterns
 */
const DEVICE_PATTERNS = {
  mobile: /android|mobi/i,
  tablet: /tablet/i,
  iphone: /iphone|ipod|ipad/i,
  blackberry: /blackberry/i,
  windows_phone: /win/i,
  desktop: /mac/i,
  linux_desktop: /linux/i,
  tv: /tv/i,
  watch: /watch/i,
} as const;

type DeviceType = keyof typeof DEVICE_PATTERNS | "computer";

/**
 * Pure function to detect device type from user agent
 *
 * @param userAgent - User agent string
 * @returns Device type string
 */
function detectDeviceType(userAgent: string): DeviceType {
  if (!userAgent || typeof userAgent !== "string") {
    return "computer";
  }

  const lowerUserAgent = userAgent.toLowerCase();

  // Check patterns in priority order
  for (const [deviceType, pattern] of Object.entries(DEVICE_PATTERNS)) {
    if (pattern.test(lowerUserAgent)) {
      return deviceType as DeviceType;
    }
  }

  return "computer";
}

/**
 * Pure function to extract visitor info from request data
 *
 * @param ip - Client IP address
 * @param userAgent - User agent string
 * @param path - Request path
 * @returns Visitor information object
 */
function extractVisitorInfo(ip: string, userAgent: string, path: string) {
  const deviceType = detectDeviceType(userAgent);
  const userAgentInfo = parseUserAgent(userAgent);
  const geo = geoip.lookup(ip);

  return {
    deviceType,
    userAgentInfo,
    geoInfo: {
      country: geo?.country || "",
      city: geo?.city || "",
    },
    requestInfo: {
      ip,
      path,
      timestamp: new Date(),
    },
  };
}

async function collectVisitorInfo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  log("collectVisitorInfo middleware");

  const alsStore = asyncLocalStorage.getStore();
  if (!alsStore) return next();

  const ip = req.ip || "";
  const userAgent = req.headers["user-agent"] || "";
  const path = req.path;

  try {
    // Get publicId from cookie or create a new one
    let publicId = req.cookies["publicId"];
    log("cookies:", JSON.stringify(req.cookies));
    if (!publicId) publicId = await uuidService.getVisitorUuid();
    log("publicId:", publicId);

    // Save publicId to ALS store and set cookie
    alsStore.requestData = { publicId };
    res.cookie("publicId", publicId, publicIdCookieOptions);

    // Extract visitor information using pure functions
    const visitorInfo = extractVisitorInfo(ip, userAgent, path);

    // Find or create visitor record
    let visitor = await VisitorModel.findOne({ publicId });
    if (!visitor) visitor = new VisitorModel({ publicId });

    // Update visitor record with extracted information
    visitor.deviceInfo.device = visitorInfo.deviceType;
    visitor.deviceInfo.os.name = visitorInfo.userAgentInfo.os.name;
    visitor.deviceInfo.os.version = visitorInfo.userAgentInfo.os.version;
    visitor.deviceInfo.browser.name = visitorInfo.userAgentInfo.browser.name;
    visitor.deviceInfo.browser.version =
      visitorInfo.userAgentInfo.browser.version;
    visitor.deviceInfo.browser.major = visitorInfo.userAgentInfo.browser.major;

    // Update visitor paths and timestamps
    visitor.ips.push(visitorInfo.requestInfo.ip);
    visitor.paths.push(visitorInfo.requestInfo.path);
    visitor.timestamps.push(visitorInfo.requestInfo.timestamp);

    // Update visitor geodata
    visitor.geoInfo.country = visitorInfo.geoInfo.country;
    visitor.geoInfo.city = visitorInfo.geoInfo.city;

    // Save visitor data (non-blocking)
    visitor.save();

    // Log visitor info
    logger.info(
      "Visitor",
      ip,
      userAgent,
      visitorInfo.deviceType,
      visitorInfo.geoInfo.country,
      visitorInfo.geoInfo.city
    );

    next();
  } catch (error) {
    logger.error("collectVisitorInfo error:", error);
    // Continue middleware chain even if visitor info collection fails
    next();
  }
}

export default collectVisitorInfo;
