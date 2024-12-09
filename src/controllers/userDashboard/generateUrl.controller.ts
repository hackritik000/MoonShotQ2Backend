import { asyncHandler } from '../../utils/asyncHandler';
import type {
  UserExtendedRequest,
  UserExtendedResponse,
} from '../../interface/user.interface';
import { ApiResponse } from '../../utils/ApiResponse';
import { ApiError } from '../../utils/ApiError';
import CookieModel from '../../models/cookie.model';

export const generateUrl = asyncHandler(
  async (req: UserExtendedRequest, res: UserExtendedResponse) => {
    const Age = req.cookies.age;
    const Gender = req.cookies.gender;
    const From = req.cookies.from;
    const To = req.cookies.to;
    const Active = req.cookies.active;
    if (!Age || !Gender || !From || !To || !Active) {
      throw new ApiError(404, "Don't get proper information");
    }
    const createModel = await CookieModel.create({
      Age,
      Gender,
      From,
      To,
      Active,
    });
    console.log(createModel);

    if (!createModel) {
      throw new ApiError(502, 'Something wrong while creating url');
    }
    console.log('--------');

    return res.json(
      new ApiResponse(
        200,
        {
          id: createModel._id,
        },
        'generated url send sucessfully'
      )
    );
  }
);
