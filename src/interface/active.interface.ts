import mongoose from "mongoose";
interface ActiveModel extends mongoose.Schema {
  userId: mongoose.ObjectId;
  firstActive: Date;
  isPrime: boolean;
  lastUpgradeDate: Date;
  numberOfUpgrade: number;
  myMetroMember: mongoose.ObjectId;
  activatedBy: mongoose.ObjectId;

  currentActive(): boolean; // Adjusted return type
  leapsDays(): number;
}
export type { ActiveModel };
