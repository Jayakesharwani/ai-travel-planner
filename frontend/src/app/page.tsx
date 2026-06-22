import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700">
      <div className="max-w-7xl mx-auto px-6">
        {/* Navbar */}
        <nav className="flex justify-between items-center py-8">
          <h1 className="text-white text-3xl md:text-4xl font-bold">
            AI Travel Planner
          </h1>

          <div className="flex gap-4">
            <Link
              href="/login"
              className="bg-white text-black px-5 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="border-2 border-white text-white px-5 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition"
            >
              Register
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center text-white py-24">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-5 py-2 mb-8">
            ✈️ AI Powered Travel Planning
          </div>

          <h1 className="text-5xl md:text-7xl font-bold max-w-5xl leading-tight">
            Plan Your Dream Trip
            <span className="block text-yellow-300">
              With Artificial Intelligence
            </span>
          </h1>

          <p className="mt-8 text-xl md:text-2xl text-blue-100 max-w-3xl">
            Generate complete travel itineraries, budget estimates,
            hotel recommendations and personalized experiences
            in seconds.
          </p>

          <div className="flex flex-col md:flex-row gap-4 mt-12">
            <Link
              href="/register"
              className="bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition shadow-xl"
            >
              Start Planning Free
            </Link>

            <Link
              href="/login"
              className="border-2 border-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white hover:text-black transition"
            >
              Login
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="grid md:grid-cols-3 gap-6 mb-20">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center text-white">
            <h2 className="text-4xl font-bold">AI</h2>
            <p className="mt-2 text-blue-100">
              Powered Itinerary Generation
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center text-white">
            <h2 className="text-4xl font-bold">Smart</h2>
            <p className="mt-2 text-blue-100">
              Budget Planning & Tracking
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center text-white">
            <h2 className="text-4xl font-bold">Instant</h2>
            <p className="mt-2 text-blue-100">
              Hotel Recommendations
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-8 pb-24">
          <div className="bg-white rounded-3xl p-8 shadow-2xl hover:-translate-y-2 transition">
            <div className="text-5xl mb-4">🗺️</div>

            <h3 className="text-2xl font-bold mb-4">
              AI Itinerary Generator
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Generate day-by-day travel plans automatically using
              Gemini AI based on destination, interests and budget.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl hover:-translate-y-2 transition">
            <div className="text-5xl mb-4">💰</div>

            <h3 className="text-2xl font-bold mb-4">
              Budget Estimation
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Get estimated costs for flights, hotels, food and
              activities before your trip starts.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl hover:-translate-y-2 transition">
            <div className="text-5xl mb-4">🏨</div>

            <h3 className="text-2xl font-bold mb-4">
              Smart Recommendations
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Discover hotels, attractions and travel tips tailored
              specifically for your destination.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-24">
          <div className="bg-white rounded-3xl p-12 text-center shadow-2xl">
            <h2 className="text-4xl font-bold mb-4">
              Ready To Plan Your Next Adventure?
            </h2>

            <p className="text-gray-600 text-lg mb-8">
              Join now and create your first AI-powered travel plan.
            </p>

            <Link
              href="/register"
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition"
            >
              Create Free Account
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}