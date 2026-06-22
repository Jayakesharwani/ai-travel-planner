import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';

import {
  createTrip,
  getTrips,
  getTrip,
  updateTrip,
  deleteTrip, 
  generateTripPlan, 
  updateActivities,
  regenerateDay,
} from '../controllers/trip.controller';

const router = Router();

router.use(authenticate);

router.post('/', asyncHandler(createTrip));
router.get('/', asyncHandler(getTrips));
router.get('/:id', asyncHandler(getTrip));
router.delete('/:id', asyncHandler(deleteTrip));
router.put('/:id', asyncHandler(updateTrip));
router.post(
    '/:id/generate',
    asyncHandler(generateTripPlan)
  );
router.patch(
    '/:id/activity',
    asyncHandler(updateActivities)
  );
  
router.patch(
    '/:id/regenerate-day',
    asyncHandler(regenerateDay)
  );

export default router;