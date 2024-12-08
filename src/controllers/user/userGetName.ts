import { User } from '../../models/user.model';
import { asyncHandler } from '../../utils/asyncHandler';
import type {
  UserExtendedRequest,
  UserExtendedResponse,
} from '../../interface/user.interface';
import { ApiResponse } from '../../utils/ApiResponse';

export const getUserName = asyncHandler(
  async (req: UserExtendedRequest, res: UserExtendedResponse) => {
    const userId = req.query.userId as string;
    const user = await User.findOne({ userId: userId?.toUpperCase() });
    return res.json(
      new ApiResponse(
        200,
        { fullname: user?.fullname, userObjectId: user?._id, userId },
        'fullname send sucessfully'
      )
    );
  }
);
