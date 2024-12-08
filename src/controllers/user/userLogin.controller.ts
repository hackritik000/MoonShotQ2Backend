import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { User } from '../../models/user.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { userGenarateAccessAndRefreshTokens } from './userGenarateAccessAndRefreshTokens.controller.js';
import type {
  UserExtendedRequest,
  UserExtendedResponse,
} from '../../interface/user.interface.js';
import { options } from '../../constants.js';

const userLogin = asyncHandler(
  async (req: UserExtendedRequest, res: UserExtendedResponse) => {
    const { username, password } = req.body;
    console.log('---------------loging again----------------');

    if (!username) {
      throw new ApiError(400, 'userId or email is required');
    }

    const user = await User.findOne({
      $or: [{ email: username }, { userId: username }],
    });

    if (!user) {
      throw new ApiError(404, 'User does not exists');
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      throw new ApiError(401, 'Invalid user credentials');
    }

    const { accessToken, refreshToken } =
      await userGenarateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select(
      '-password -refreshToken'
    );

    console.log('---------------loged again----------------');
    return res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
            accessToken,
            refreshToken,
          },

          'User logged In Successfully'
        )
      );
  }
);

export { userLogin };
