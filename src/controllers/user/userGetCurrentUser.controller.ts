import type {
  UserExtendedRequest,
  UserExtendedResponse,
} from '../../interface/user.interface.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const userGetCurrentUser = asyncHandler(
  async (req: UserExtendedRequest, res: UserExtendedResponse) => {
    return res
      .status(200)
      .json(
        new ApiResponse(200, req.user, 'Current User is fetch Successfully')
      );
  }
);

export { userGetCurrentUser };
