import express from 'express';
import type { Request } from 'express';
import mongoose from 'mongoose';

interface UserExtendedRequest extends Request {
  user: {
    _id?: mongoose.ObjectId;
    fullname?: string;
    email?: string;
  };
}

interface UserExtendedResponse extends express.Response {}

interface UserAccessDecode {
  _id: string;
  email: string;
  userId: string;
  fullname: string;
}

interface UserModel extends Document {
  _id: mongoose.ObjectId;
  userId: string;
  email: string;
  fullname: string;
  phoneNumber: string;
  password: string;
  refreshToken?: string;
  timestamps: {
    createdAt: Date;
    updatedAt: Date;
  };

  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}
export type {
  UserExtendedResponse,
  UserExtendedRequest,
  UserModel,
  UserAccessDecode,
};
