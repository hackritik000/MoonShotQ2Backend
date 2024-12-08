import { asyncHandler } from '../../utils/asyncHandler';
import type {
  UserExtendedRequest,
  UserExtendedResponse,
} from '../../interface/user.interface';
import { ApiResponse } from '../../utils/ApiResponse';
import CookieModel from '../../models/cookie.model';
import { options } from '../../constants';

export const getCookieUrl = asyncHandler(
  async (req: UserExtendedRequest, res: UserExtendedResponse) => {
    const { id } = req.body;

    const getCookie = await CookieModel.findById(id);
    if (!getCookie) {
      return res.json(
        new ApiResponse(200, {}, 'generated url not send sucessfully')
      );
    }
    return res
      .cookie('age', getCookie.Age, options)
      .cookie('gender', getCookie.Gender, options)
      .cookie('active', getCookie.Active, options)
      .cookie('from', getCookie.From, options)
      .cookie('to', getCookie.To, options)
      .json(new ApiResponse(200, {}, 'generated url send sucessfully'));
  }
);
