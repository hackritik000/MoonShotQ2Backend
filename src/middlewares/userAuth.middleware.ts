import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import type {
  UserAccessDecode,
  UserExtendedRequest,
} from '../interface/user.interface.js';
import express from 'express';

export const userAuth = asyncHandler(
  async (req: UserExtendedRequest, _: null, next: express.NextFunction) => {
    try {
      const token =
        req.cookies?.accessToken ||
        req.header('Authorization')?.replace('Bearer ', '');

      console.log(req.cookies);
      console.log('--------------------------------');
      if (!token) {
        throw new ApiError(401, 'Unauthorized request');
      }

      const decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string
      ) as UserAccessDecode;

      const user = await User.findById(decodedToken?._id).select(
        '-password -refreshToken'
      );

      if (!user) {
        throw new ApiError(401, 'Invalid accessToken');
      }

      req.user = user;
      next();
    } catch (error) {
      const typeError = error as Error;
      throw new ApiError(401, typeError?.message || 'Invalid accessToken');
    }
  }
);
