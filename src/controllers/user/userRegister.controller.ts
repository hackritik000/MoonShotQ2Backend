import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { User } from '../../models/user.model.js';
import { ApiError } from '../../utils/ApiError.js';
import type {
  UserExtendedRequest,
  UserExtendedResponse,
} from '../../interface/user.interface.js';

const userRegister = asyncHandler(
  async (req: UserExtendedRequest, res: UserExtendedResponse) => {
    const { userId, email, fullname, password, phoneNumber } = req.body;

    if (
      [userId, email, fullname, password].some((field) => field?.trim() === '')
    ) {
      throw new ApiError(
        400,
        'username and email and fullname and password is required'
      );
    }

    const existedUser = await User.findOne({
      $or: [{ email }, { userId }],
    });

    if (existedUser) {
      throw new ApiError(409, 'User with email or username already exists');
    }

    const user = await User.create({
      fullname,
      email,
      phoneNumber,
      password,
      userId,
    });

    const createdUser = await User.findById(user._id).select(' -refreshToken');

    if (!createdUser) {
      throw new ApiError(
        500,
        'Something went wrong while registering the user'
      );
    }

    return res
      .status(200)
      .json(new ApiResponse(200, createdUser, 'User registered Successfully'));
  }
);

export { userRegister };
