import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { User } from '../../models/user.model.js';
import type {
  UserExtendedRequest,
  UserExtendedResponse,
} from '../../interface/user.interface.js';

const userLogout = asyncHandler(
  async (req: UserExtendedRequest, res: UserExtendedResponse) => {
    User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: false,
      secure: false,
    };

    return res
      .status(200)
      .clearCookie('accessToken', options)
      .clearCookie('refreshToken', options)
      .json(new ApiResponse(200, {}, 'User logged out Successfully'));
  }
);

export { userLogout };
