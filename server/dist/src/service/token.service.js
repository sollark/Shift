import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import RefreshTokenDataModel from '../mongo/models/refreshToken.model.js';
import { log } from './console.service.js';
const { refreshSecret, accessSecret } = config.jwt;
// TODO same payload for both tokens
function generateTokens(userData) {
    if (!accessSecret)
        throw new Error('JWT_ACCESS_SECRET is not defined');
    if (!refreshSecret)
        throw new Error('JWT_REFRESH_SECRET is not defined');
    log('generateTokens, userData', userData);
    const accessToken = jwt.sign({ userData }, accessSecret, {
        expiresIn: '10m',
    });
    const refreshToken = jwt.sign({}, refreshSecret, {
        expiresIn: '1h',
    });
    return { accessToken, refreshToken };
}
async function saveToken(refreshToken) {
    const oldRefreshToken = await getRefreshToken(refreshToken);
    if (oldRefreshToken) {
        await RefreshTokenDataModel.findOneAndDelete({ refreshToken });
    }
    await RefreshTokenDataModel.create({ refreshToken });
}
async function removeToken(refreshToken) {
    const result = await RefreshTokenDataModel.deleteOne({ refreshToken });
    return result;
}
async function getRefreshToken(refreshToken) {
    const tokenData = await RefreshTokenDataModel.findOne({ refreshToken });
    return tokenData?.refreshToken;
}
async function validateAccessToken(token) {
    if (!accessSecret)
        throw new Error('JWT_ACCESS_SECRET is not defined');
    try {
        const payload = jwt.verify(token, accessSecret);
        log('validateAccessToken, payload: ', payload);
        return payload;
    }
    catch (error) {
        log('validateAccessToken error', error.message);
        return null;
    }
}
async function validateRefreshToken(token) {
    if (!refreshSecret)
        throw new Error('JWT_REFRESH_SECRET is not defined');
    try {
        const payload = jwt.verify(token, refreshSecret);
        log('validateRefreshToken, payload: ', payload);
        return payload;
    }
    catch (error) {
        log('validateRefreshToken error', error.message);
        return null;
    }
}
async function isExpired(token) {
    const payload = await validateRefreshToken(token);
    if (!payload)
        return true;
    const { exp } = payload;
    if (!exp)
        return true;
    const now = Math.floor(Date.now() / 1000);
    if (now > exp)
        return true;
    return false;
}
export const tokenService = {
    generateTokens,
    saveToken,
    removeToken,
    getRefreshToken,
    validateAccessToken,
    validateRefreshToken,
    isExpired,
};
