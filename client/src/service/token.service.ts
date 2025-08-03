import { jwtDecode, JwtPayload } from "jwt-decode";
import { log } from "./console.service";

/**
 * Token validation result types
 */
type TokenDecodeResult =
  | { success: true; payload: JwtPayload }
  | { success: false; error: string };

type TokenExpirationResult =
  | { expired: true; reason: string }
  | { expired: false };

/**
 * Pure function to decode JWT token with proper error handling
 *
 * @param token - JWT token string to decode
 * @returns Result object with success status and payload or error
 */
function decodeToken(token: string): TokenDecodeResult {
  // Input validation
  if (!token || typeof token !== "string") {
    return {
      success: false,
      error: "Invalid token: token must be a non-empty string",
    };
  }

  if (token.trim().length === 0) {
    return { success: false, error: "Invalid token: token cannot be empty" };
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    if (!decoded) {
      return { success: false, error: "Invalid token: failed to decode" };
    }

    return { success: true, payload: decoded };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown decode error";
    return { success: false, error: `Token decode failed: ${errorMessage}` };
  }
}

/**
 * Pure function to check if JWT token is expired
 *
 * @param token - JWT token string to check
 * @param currentTimeSeconds - Current time in seconds (for testability)
 * @returns Result object indicating if token is expired and reason
 */
function checkTokenExpiration(
  token: string,
  currentTimeSeconds: number = Math.floor(Date.now() / 1000)
): TokenExpirationResult {
  const decodeResult = decodeToken(token);

  if (!decodeResult.success) {
    return { expired: true, reason: `Invalid token: ${decodeResult.error}` };
  }

  const { payload } = decodeResult;

  if (!payload.exp || typeof payload.exp !== "number") {
    return {
      expired: true,
      reason: "Token missing or invalid expiration claim",
    };
  }

  if (payload.exp < currentTimeSeconds) {
    return { expired: true, reason: "Token has expired" };
  }

  return { expired: false };
}

/**
 * Legacy function for backward compatibility - impure wrapper around pure function
 *
 * @param token - JWT token string to check
 * @returns boolean indicating if token is expired
 */
function isTokenExpired(token: string): boolean {
  log("Checking if access token is expired ...");

  const result = checkTokenExpiration(token);

  if (result.expired) {
    log(`Token expiration check: ${result.reason}`);
    return true;
  }

  log("Token is valid and not expired");
  return false;
}

/**
 * Pure helper function to extract specific claims from token
 *
 * @param token - JWT token string
 * @param claimName - Name of the claim to extract
 * @returns Claim value or null if not found
 */
function extractTokenClaim<T = any>(
  token: string,
  claimName: string
): T | null {
  const decodeResult = decodeToken(token);

  if (!decodeResult.success) {
    return null;
  }

  const claim = decodeResult.payload[claimName as keyof JwtPayload];
  return claim !== undefined ? (claim as T) : null;
}

export const tokenService = {
  // Pure functions (recommended for new code)
  decodeToken,
  checkTokenExpiration,
  extractTokenClaim,

  // Legacy function (for backward compatibility)
  isTokenExpired,
};
