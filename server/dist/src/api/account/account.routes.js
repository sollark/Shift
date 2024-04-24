import express from 'express';
import asyncHandler from '../../middleware/asyncHandler.js';
import requireAuth from '../../middleware/requireAuth.js';
import validateRequest from '../../middleware/validationHandler.js';
import { getAccount, updateAccount } from './account.controller.js';
// This api is used for controlling  user's account
const router = express.Router();
router.post('/update', requireAuth, validateRequest, asyncHandler(updateAccount));
router.get('/', requireAuth, asyncHandler(getAccount));
// TODO middlewares, regex
// router.get('/get/:id([0-9a-z]{24})', requireAuth, asyncHandler(getAccount))
export { router as accountRoutes };
