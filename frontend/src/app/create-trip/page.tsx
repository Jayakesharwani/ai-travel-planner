'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTrip } from '@/services/trip.service';

export default function CreateTripPage() {
const router = useRouter();

const [destination, setDestination] =
useState('');

const [startDate, setStartDate] =
useState('');

const [endDate, setEndDate] =
useState('');

const [budget, setBudget] =
useState('');

const [interests, setInterests] =
useState('');

const [loading, setLoading] =
useState(false);

const [error, setError] =
useState('');

async function handleSubmit(
e: React.FormEvent
) {
e.preventDefault();

try {
  setLoading(true);
  setError('');

  const response = await createTrip({
    destination,
    startDate,
    endDate,
    budget: Number(budget),
    interests: interests
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean),
  });

  if (response.success) {
    router.push('/dashboard');
  } else {
    setError(
      response.message ||
        'Failed to create trip'
    );
  }
} catch (err: any) {
  setError(
    err?.message ||
      'Failed to create trip'
  );
} finally {
  setLoading(false);
}

}

return (
<main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
<div className="max-w-3xl mx-auto py-12 px-6">

    <button
      type="button"
      onClick={() =>
        router.push('/dashboard')
      }
      className="text-blue-600 font-medium mb-6"
    >
      ← Back to Dashboard
    </button>

    <div className="mb-8">
      <h1 className="text-5xl font-bold">
        Create New Trip
      </h1>

      <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mt-4">
        ✨ AI Powered Travel Planning
      </div>

      <p className="text-gray-600 mt-4">
        Tell us where you want to go and AI
        will generate your travel plan.
      </p>
    </div>

    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl shadow-xl p-8 space-y-5"
    >
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-xl">
          {error}
        </div>
      )}

      <div>
        <label className="block mb-2 font-semibold">
          Destination
        </label>

        <input
          type="text"
          value={destination}
          onChange={(e) =>
            setDestination(
              e.target.value
            )
          }
          className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Paris"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block mb-2 font-semibold">
            Start Date
          </label>

          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              setStartDate(
                e.target.value
              )
            }
            className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            End Date
          </label>

          <input
            type="date"
            value={endDate}
            onChange={(e) =>
              setEndDate(
                e.target.value
              )
            }
            className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 font-semibold">
          Budget
        </label>

        <input
          type="number"
          value={budget}
          onChange={(e) =>
            setBudget(
              e.target.value
            )
          }
          className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="1500"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">
          Interests
        </label>

        <input
          type="text"
          value={interests}
          onChange={(e) =>
            setInterests(
              e.target.value
            )
          }
          className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="food, history, shopping"
        />

        <p className="text-sm text-gray-500 mt-2">
          Click suggestions below or type your own interests.
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {[
            'Food',
            'History',
            'Shopping',
            'Nature',
            'Adventure',
            'Nightlife',
            'Culture',
            'Photography',
            'Beaches',
            'Mountains',
          ].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                if (
                  interests
                    .toLowerCase()
                    .includes(
                      item.toLowerCase()
                    )
                )
                  return;

                setInterests((prev) =>
                  prev
                    ? `${prev}, ${item}`
                    : item
                );
              }}
              className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 rounded-xl font-semibold hover:opacity-90 transition"
      >
        {loading
          ? 'Creating...'
          : 'Create Trip'}
      </button>
    </form>
  </div>
</main>

);
}