import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { User } from '../../models/user.model.js';
import jwt from 'jsonwebtoken';
import { userGenarateAccessAndRefreshTokens } from './userGenarateAccessAndRefreshTokens.controller.js';
import type {
  UserAccessDecode,
  UserExtendedRequest,
  UserExtendedResponse,
} from '../../interface/user.interface.js';

const userRefreshAccessToken = asyncHandler(
  async (req: UserExtendedRequest, res: UserExtendedResponse) => {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      throw new ApiError(401, 'unauthoried request');
    }
    try {
      const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET as string
      ) as UserAccessDecode;

      const user = decodedToken ? await User.findById(decodedToken._id) : null;

      if (!user) {
        throw new ApiError(401, 'Invalid refreshToken');
      }

      if (incomingRefreshToken !== user?.refreshToken) {
        throw new ApiError(401, 'Refresh token is expired or used');
      }

      const { accessToken, refreshToken } =
        await userGenarateAccessAndRefreshTokens(user._id);

      const options = {
        httpOnly: true,
        secure: true,
      };

      return res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(
          new ApiResponse(
            200,
            {
              accessToken,
              refreshToken,
            },
            'Access token refreshed'
          )
        );
    } catch (error) {
      const typeError = error as Error;
      throw new ApiError(401, typeError?.message || 'Invalid refreshToken');
    }
  }
);

export { userRefreshAccessToken };
