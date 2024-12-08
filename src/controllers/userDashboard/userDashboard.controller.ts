import { asyncHandler } from '../../utils/asyncHandler';
import type {
  UserExtendedRequest,
  UserExtendedResponse,
} from '../../interface/user.interface';
import { ApiResponse } from '../../utils/ApiResponse';
import { ApiError } from '../../utils/ApiError';
import { User } from '../../models/user.model';
import DataModel from '../../models/data.model';

export const userDashboard = asyncHandler(
  async (req: UserExtendedRequest, res: UserExtendedResponse) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, 'user not found');
    }
    const data = await DataModel.find();
    if (!data) {
      throw new ApiError(404, 'data not found');
    }

    return res.json(
      new ApiResponse(
        200,
        {
          fullname: user.fullname,
          userId: user.userId,
          data: data,
        },
        'Dashboard Details send sucessfully'
      )
    );
  }
);
