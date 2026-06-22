import { Trip } from '../models/trip.model';
import { AppError } from '../middleware/errorHandler';
import { geminiService } from './gemini.service';

export class TripService {
  async createTrip(userId: string, data: any) {
    const trip = await Trip.create({
      ...data,
      owner: userId,
    });

    return trip;
  }

  async getTrips(userId: string) {
    return Trip.find({ owner: userId }).sort({
      createdAt: -1,
    });
  }

  async getTrip(userId: string, tripId: string) {
    const trip = await Trip.findOne({
      _id: tripId,
      owner: userId,
    });

    if (!trip) {
      throw new AppError('Trip not found', 404);
    }

    return trip;
  }

  async deleteTrip(userId: string, tripId: string) {
    const trip = await Trip.findOneAndDelete({
      _id: tripId,
      owner: userId,
    });

    if (!trip) {
      throw new AppError('Trip not found', 404);
    }

    return trip;
  } 

  async updateTrip(
    userId: string,
    tripId: string,
    data: any
  ) {
    const trip = await Trip.findOneAndUpdate(
      {
        _id: tripId,
        owner: userId,
      },
      data,
      {
        new: true,
        runValidators: true,
      }
    );
  
    if (!trip) {
      throw new AppError('Trip not found', 404);
    }
  
    return trip;
  } 

  async generateTripPlan(
    userId: string,
    tripId: string
  ) {
    const trip = await Trip.findOne({
      _id: tripId,
      owner: userId,
    });
  
    if (!trip) {
      throw new AppError('Trip not found', 404);
    }
  
    const aiResult = await geminiService.generateTravelPlan({
      destination: trip.destination,
      startDate: trip.startDate,
      endDate: trip.endDate,
      budget: trip.budget,
      interests: trip.interests,
    });
  
    trip.itinerary = aiResult.itinerary;
    trip.budgetEstimate = aiResult.budgetEstimate;
    trip.destinationNotes = aiResult.destinationNotes;
    trip.hotelSuggestions = aiResult.hotelSuggestions;
  
    await trip.save();
  
    return trip;
  }
  
  async updateActivities(
    userId: string,
    tripId: string,
    itinerary: any
  ) {
    const trip = await Trip.findOneAndUpdate(
      {
        _id: tripId,
        owner: userId,
      },
      {
        itinerary,
      },
      {
        new: true,
      }
    );
  
    if (!trip) {
      throw new AppError('Trip not found', 404);
    }
  
    return trip;
  }
 
  async regenerateDay(
    userId: string,
    tripId: string,
    dayNumber: number
  ) {
    const trip = await this.getTrip(userId, tripId);
    const itinerary = trip.itinerary as any;
    const days = itinerary?.days || [];
  
    const dayIndex = days.findIndex(
      (d: any) => d.day === dayNumber
    );
  
    if (dayIndex === -1) {
      throw new AppError('Day not found', 404);
    }
  
    days[dayIndex] = {
      day: dayNumber,
      activities: [
        {
          time: '09:00',
          title: 'New Morning Activity',
          description: 'Regenerated activity',
        },
        {
          time: '14:00',
          title: 'New Afternoon Activity',
          description: 'Regenerated activity',
        },
      ],
    };
  
    trip.itinerary = {
      ...itinerary,
      days,
    };
  
    await trip.save();
  
    return trip;
  }

}



export const tripService = new TripService();