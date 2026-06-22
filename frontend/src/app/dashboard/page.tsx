'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getTrips } from '@/services/trip.service';

export default function DashboardPage() {
const router = useRouter();

const [trips, setTrips] = useState<any[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
const token = localStorage.getItem('token');

if (!token) {
  router.push('/login');
  return;
}

loadTrips();

}, []);

async function loadTrips() {
try {
const response = await getTrips();

  if (response.success) {
    setTrips(response.data);
  }
} catch (error) {
  console.error(error);
} finally {
  setLoading(false);
}

}

function handleLogout() {
localStorage.removeItem('token');
localStorage.removeItem('user');

router.push('/login');

}

const user =
typeof window !== 'undefined'
? JSON.parse(
localStorage.getItem('user') || '{}'
)
: null;

return (
<main className="min-h-screen bg-slate-100">
<div className="max-w-7xl mx-auto px-6 py-10">

    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl mb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

        <div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Welcome Back
            {user?.name ? `, ${user.name}` : ''}
          </h1>

          <p className="mt-3 text-blue-100 text-lg">
            Manage your AI-powered travel plans.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/create-trip"
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            + Create Trip
          </Link>

          <button
            onClick={handleLogout}
            className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-black transition"
          >
            Logout
          </button>
        </div>

      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-6 mb-10">

      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="text-4xl mb-3">✈️</div>

        <h3 className="font-bold text-xl">
          Total Trips
        </h3>

        <p className="text-4xl font-bold mt-3 text-blue-600">
          {trips.length}
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="text-4xl mb-3">🤖</div>

        <h3 className="font-bold text-xl">
          AI Planner
        </h3>

        <p className="text-gray-600 mt-3">
          Generate complete itineraries instantly.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="text-4xl mb-3">🌍</div>

        <h3 className="font-bold text-xl">
          Smart Travel
        </h3>

        <p className="text-gray-600 mt-3">
          Budget planning, hotels and activities.
        </p>
      </div>

    </div>

    {loading ? (
      <div className="bg-white rounded-3xl p-12 text-center shadow-lg">
        <h2 className="text-2xl font-semibold">
          Loading trips...
        </h2>
      </div>
    ) : trips.length === 0 ? (
      <div className="bg-white rounded-3xl p-12 text-center shadow-lg">

        <div className="text-7xl mb-4">
          ✈️
        </div>

        <h2 className="text-3xl font-bold mb-3">
          No Trips Yet
        </h2>

        <p className="text-gray-500 mb-8">
          Create your first AI-powered travel plan.
        </p>

        <Link
          href="/create-trip"
          className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold"
        >
          Create First Trip
        </Link>

      </div>
    ) : (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {trips.map((trip) => (
          <Link
            key={trip._id}
            href={`/trips/${trip._id}`}
            className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {trip.destination}
              </h2>

              <span className="text-3xl">
                📍
              </span>
            </div>

            <p className="text-gray-600 mb-2">
              Budget: ₹{trip.budget}
            </p>

            <p className="text-gray-500 text-sm">
              {new Date(
                trip.startDate
              ).toLocaleDateString()}
            </p>

            <div className="mt-6">
              <span className="text-blue-600 font-semibold">
                View Trip →
              </span>
            </div>
          </Link>
        ))}

      </div>
    )}
  </div>
</main>

);
}