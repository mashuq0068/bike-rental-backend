import { Schema, model } from 'mongoose'
import { IBike } from './bike.interface'

const bikeSchema = new Schema<IBike>(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    description: {
      type: String,
      required: [true, 'description is required'],
    },
    pricePerHour: {
      type: Number,
      required: [true, 'price per hour is required'],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    cc: {
      type: Number,
      required: [true, 'CC is required'],
    },
    year: {
      type: Number,
      required: [true, 'year is required'],
    },
    model: {
      type: String,
      required: [true, 'model is required'],
    },
    brand: {
      type: String,
      required: [true, 'brand is required'],
    },
  },
  {
    timestamps: true,
  },
)

export const Bike = model<IBike>('Bike', bikeSchema)
