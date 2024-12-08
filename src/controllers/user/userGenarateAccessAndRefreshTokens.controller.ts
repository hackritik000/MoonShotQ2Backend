import { ApiError } from '../../utils/ApiError.js';
import { User } from '../../models/user.model.js';
import mongoose from 'mongoose';

async function userGenarateAccessAndRefreshTokens(
  userId: mongoose.ObjectId
): Promise<{ accessToken: string; refreshToken: string }> {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(501, 'Something wrong with server');
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    throw new ApiError(
      500,
      'Something went wrong while genarating refreshToken and accessToken'
    );
  }
}

export { userGenarateAccessAndRefreshTokens };
