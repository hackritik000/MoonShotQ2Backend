import mongoose, { Schema, Document } from 'mongoose';

enum Age {
  '15-25' = '15-25',
  '>25' = '>25',
}

enum Gender {
  Male = 'Male',
  Female = 'Female',
}

interface DataModel extends Document {
  Day: Date;
  Age: Age;
  Gender: Gender;
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  F: number;
  timestamps: {
    createdAt: Date;
    updatedAt: Date;
  };
}

const DataSchema: Schema = new Schema<DataModel>(
  {
    Day: { type: Date, required: true },
    Age: { type: String, enum: Object.values(Age), required: true },
    Gender: { type: String, enum: Object.values(Gender), required: true },
    A: { type: Number, required: true },
    B: { type: Number, required: true },
    C: { type: Number, required: true },
    D: { type: Number, required: true },
    E: { type: Number, required: true },
    F: { type: Number, required: true },
  },
  { timestamps: true }
);

const DataModel = mongoose.model<DataModel>('Data', DataSchema);

export default DataModel;
