'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import {
  getTrip,
  generateTrip,
  regenerateDay,
  updateActivities,
} from '@/services/trip.service';

export default function TripDetailsPage() {
  const params = useParams();

  const tripId = params.id as string;

  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] =
    useState(false);

  useEffect(() => {
    loadTrip();
  }, []);

  async function loadTrip() {
    try {
      const response =
        await getTrip(tripId);

      if (response.success) {
        setTrip(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function updateActivityTitle(
    dayNumber: number,
    activityIndex: number,
    value: string
  ) {
    const updatedTrip = {
      ...trip,
    };

    const day =
      updatedTrip.itinerary.days.find(
        (d: any) =>
          d.day === dayNumber
      );

    if (!day) return;

    day.activities[
      activityIndex
    ].title = value;

    setTrip(updatedTrip);
  }

  async function handleGenerate() {
    try {
      setGenerating(true);

      const response =
        await generateTrip(tripId);

      if (response.success) {
        setTrip(response.data);
      }
    } catch (error) {
      console.error(error);

      alert(
        'Failed to generate trip'
      );
    } finally {
      setGenerating(false);
    }
  }

  async function handleRegenerateDay(
    day: number
  ) {
    try {
      const response =
        await regenerateDay(
          tripId,
          day
        );

      if (response.success) {
        setTrip(response.data);
      }
    } catch (error) {
      console.error(error);

      alert(
        'Failed to regenerate day'
      );
    }
  }

  async function handleSaveItinerary() {
    try {
      const response =
        await updateActivities(
          tripId,
          trip.itinerary
        );

      if (response.success) {
        alert(
          'Itinerary saved successfully'
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-100">
        <h1 className="text-2xl font-bold">
          Loading Trip...
        </h1>
      </main>
    );
  }

  if (!trip) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-100">
        <h1 className="text-2xl font-bold">
          Trip Not Found
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 py-10">
      <div className="max-w-6xl mx-auto px-6">

        {/* HERO */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h1 className="text-5xl font-bold">
            {trip.destination}
          </h1>

          <p className="text-gray-600 mt-3">
            Budget: ₹{trip.budget}
          </p>

          <p className="text-gray-500 mt-1">
            {new Date(
              trip.startDate
            ).toLocaleDateString()}
            {' → '}
            {new Date(
              trip.endDate
            ).toLocaleDateString()}
          </p>

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90"
          >
            {generating
              ? 'Generating AI Plan...'
              : 'Generate AI Travel Plan'}
          </button>
        </div>

        {/* ITINERARY */}

        {trip.itinerary && (
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">
                Day Wise Itinerary
              </h2>

              <button
                onClick={
                  handleSaveItinerary
                }
                className="bg-green-600 text-white px-5 py-3 rounded-xl font-semibold"
              >
                Save Changes
              </button>
            </div>

            {trip.itinerary.days?.map(
              (day: any) => (
                <div
                  key={day.day}
                  className="mb-10 border-b pb-8"
                >
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-2xl font-bold">
                      Day {day.day}
                    </h3>

                    <button
                      onClick={() =>
                        handleRegenerateDay(
                          day.day
                        )
                      }
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      Regenerate Day
                    </button>
                  </div>

                  <div className="space-y-4">
                    {day.activities?.map(
                      (
                        activity: any,
                        index: number
                      ) => (
                        <div
                          key={index}
                          className="bg-slate-50 border rounded-2xl p-5"
                        >
                          <div className="font-bold text-blue-600 mb-2">
                            {
                              activity.time
                            }
                          </div>

                          <input
                            value={
                              activity.title
                            }
                            onChange={(
                              e
                            ) =>
                              updateActivityTitle(
                                day.day,
                                index,
                                e.target
                                  .value
                              )
                            }
                            className="w-full border rounded-lg p-3 font-semibold mb-3"
                          />

                          <p className="text-gray-600">
                            {
                              activity.description
                            }
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* BUDGET */}

        {trip.budgetEstimate && (
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6">
              Budget Estimate
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-100 p-4 rounded-xl">
                Flights:
                ₹
                {
                  trip
                    .budgetEstimate
                    .flights
                }
              </div>

              <div className="bg-slate-100 p-4 rounded-xl">
                Accommodation:
                ₹
                {
                  trip
                    .budgetEstimate
                    .accommodation
                }
              </div>

              <div className="bg-slate-100 p-4 rounded-xl">
                Food:
                ₹
                {
                  trip
                    .budgetEstimate
                    .food
                }
              </div>

              <div className="bg-slate-100 p-4 rounded-xl">
                Activities:
                ₹
                {
                  trip
                    .budgetEstimate
                    .activities
                }
              </div>
            </div>
          </div>
        )}

        {/* NOTES */}

        {trip.destinationNotes?.length >
          0 && (
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6">
              Travel Notes
            </h2>

            <ul className="space-y-3">
              {trip.destinationNotes.map(
                (
                  note: string,
                  index: number
                ) => (
                  <li
                    key={index}
                    className="bg-blue-50 p-4 rounded-xl"
                  >
                    • {note}
                  </li>
                )
              )}
            </ul>
          </div>
        )}

        {/* HOTELS */}

        {trip.hotelSuggestions?.length >
          0 && (
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6">
              Hotel Suggestions
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {trip.hotelSuggestions.map(
                (
                  hotel: any,
                  index: number
                ) => (
                  <div
                    key={index}
                    className="border rounded-2xl p-5 hover:shadow-md transition"
                  >
                    <h3 className="font-bold text-xl">
                      {hotel.name}
                    </h3>

                    <p className="text-gray-600 mt-2">
                      {
                        hotel.category
                      }
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}