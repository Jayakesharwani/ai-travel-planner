import mongoose, { Document, Schema } from 'mongoose';

export interface ITrip extends Document {
    destination: string;
    startDate: Date;
    endDate: Date;
    budget: number;
    interests: string[];
  
    itinerary: unknown;
  
    budgetEstimate: unknown;
    destinationNotes: string[];
    hotelSuggestions: unknown[];
  
    owner: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  }

const tripSchema = new Schema<ITrip>(
  {
    destination: {
      type: String,
      required: true,
      trim: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    budget: {
      type: Number,
      required: true,
      min: 0,
    },

    interests: [
      {
        type: String,
        trim: true,
      },
    ],

    itinerary: {
      type: Schema.Types.Mixed,
      default: null,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }, 
    budgetEstimate: {
        type: Schema.Types.Mixed,
        default: null,
    },
      
    destinationNotes: {
        type: [String],
        default: [],
    },
      
    hotelSuggestions: {
        type: [Schema.Types.Mixed],
        default: [],
    },
  },
  {
    timestamps: true,
  }
  
);

export const Trip = mongoose.model<ITrip>('Trip', tripSchema);