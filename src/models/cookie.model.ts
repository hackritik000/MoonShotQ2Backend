import mongoose, { Schema, Document } from 'mongoose';

enum Age {
  '15-25' = '15-25',
  '>25' = '>25',
}

enum Gender {
  Male = 'Male',
  Female = 'Female',
}

interface CookieModel extends Document {
  From: string;
  To: string;
  Active: string;
  Age: Age;
  Gender: Gender;
  createdAt: Date;
}

const CookieSchema: Schema = new Schema<CookieModel>(
  {
    Age: { type: String, enum: Object.values(Age) },
    Gender: { type: String, enum: Object.values(Gender) },
    From: String,
    To: String,
    Active: String,
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600 * 24, // 1 day
    },
  },
  { timestamps: false }
);

const CookieModel = mongoose.model<CookieModel>('CookieModel', CookieSchema);

export default CookieModel;
