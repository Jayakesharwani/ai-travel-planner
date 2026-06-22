import { Request, Response } from 'express';
import { tripService } from '../services/trip.service';
import { AppError } from '../middleware/errorHandler';

export async function createTrip(
  req: Request,
  res: Response
): Promise<void> {
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError('Authentication required', 401);
  }

  const trip = await tripService.createTrip(userId, req.body);

  res.status(201).json({
    success: true,
    data: trip,
  });
}

export async function getTrips(
  req: Request,
  res: Response
): Promise<void> {
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError('Authentication required', 401);
  }

  const trips = await tripService.getTrips(userId);

  res.status(200).json({
    success: true,
    data: trips,
  });
}

export async function getTrip(
  req: Request,
  res: Response
): Promise<void> {
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError('Authentication required', 401);
  }

  const tripId = Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id;

  if (!tripId) {
    throw new AppError('Trip id is required', 400);
  }

  const trip = await tripService.getTrip(userId, tripId);

  res.status(200).json({
    success: true,
    data: trip,
  });
}

export async function deleteTrip(
  req: Request,
  res: Response
): Promise<void> {
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError('Authentication required', 401);
  }

  const tripId = Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id;

  if (!tripId) {
    throw new AppError('Trip id is required', 400);
  }

  await tripService.deleteTrip(userId, tripId);

  res.status(200).json({
    success: true,
    message: 'Trip deleted successfully',
  });
} 

export async function updateTrip(
    req: Request,
    res: Response
  ): Promise<void> {
    const userId = req.user?.userId;
  
    if (!userId) {
      throw new AppError('Authentication required', 401);
    }
  
    const tripId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;
  
    if (!tripId) {
      throw new AppError('Trip id is required', 400);
    }
  
    const trip = await tripService.updateTrip(
      userId,
      tripId,
      req.body
    );
  
    res.status(200).json({
      success: true,
      data: trip,
    });
  } 

  export async function generateTripPlan(
    req: Request,
    res: Response
  ): Promise<void> {
    const userId = req.user?.userId;
  
    if (!userId) {
      throw new AppError('Authentication required', 401);
    }
  
    const tripId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;
  
    if (!tripId) {
      throw new AppError('Trip id is required', 400);
    }
  
    const trip = await tripService.generateTripPlan(
      userId,
      tripId
    );
  
    res.status(200).json({
      success: true,
      data: trip,
    });
  } 

  export async function updateActivities(
    req: Request,
    res: Response
  ): Promise<void> {
    const userId = req.user?.userId;
  
    if (!userId) {
      throw new AppError('Authentication required', 401);
    }
  
    const tripId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;
  
    if (!tripId) {
      throw new AppError('Trip id is required', 400);
    }
  
    const trip = await tripService.updateActivities(
      userId,
      tripId,
      req.body.itinerary
    );
  
    res.status(200).json({
      success: true,
      data: trip,
    });
  }

  export async function regenerateDay(
    req: Request,
    res: Response
  ): Promise<void> {
    const userId = req.user?.userId;
  
    if (!userId) {
      throw new AppError('Authentication required', 401);
    }
  
    const tripId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;
  
    if (!tripId) {
      throw new AppError('Trip id is required', 400);
    }
  
    const trip = await tripService.regenerateDay(
      userId,
      tripId,
      Number(req.body.day)
    );
  
    res.status(200).json({
      success: true,
      data: trip,
    });
  }