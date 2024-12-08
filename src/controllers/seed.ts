import type {
  UserExtendedRequest,
  UserExtendedResponse,
} from '../interface/user.interface';
import DataModel from '../models/data.model';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import xlsx from 'xlsx';

export const seed = asyncHandler(
  async (_: UserExtendedRequest, res: UserExtendedResponse) => {
    console.log('seeding starting');
    const workbook = xlsx.readFile('FrontendDeveloperAssignmentData.xlsx');
    const sheetName = workbook.SheetNames;

    const sheet = workbook.Sheets[sheetName[0]];

    const data = xlsx.utils.sheet_to_json(sheet);
    console.log(data);
    for (const e of data) {
      const excelEpoch = new Date(Date.UTC(1900, 0, 1)); // 1900-01-01
      const daysOffset = e.Day > 59 ? e.Day - 2 : e.Day - 1; // Adjust for Excel's leap year bug in 1900
      const Day = new Date(
        excelEpoch.getTime() + daysOffset * 24 * 60 * 60 * 1000
      ); // Add days in milliseconds

      console.log(Day);
      await DataModel.create({
        ...e,
        Day,
      });
    }

    return res
      .status(200)
      .json(new ApiResponse(200, { data }, 'seed send sucessfully'));
  }
);
