import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-sky-50 via-cyan-50 to-teal-50 dark:from-slate-900 dark:via-cyan-950 dark:to-slate-900 relative overflow-hidden">
      {/* Animated Ocean Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-200/20 rounded-full blur-3xl"></div>

        {/* Floating bubbles */}
        <div className="absolute bottom-0 left-[10%] w-4 h-4 bg-white/40 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-0 left-[30%] w-6 h-6 bg-white/30 rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-0 left-[60%] w-3 h-3 bg-white/50 rounded-full animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-[80%] w-5 h-5 bg-white/40 rounded-full animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="pt-12 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100/80 dark:bg-cyan-900/50 backdrop-blur-sm rounded-full text-cyan-700 dark:text-cyan-300 text-sm font-medium mb-8 border border-cyan-200 dark:border-cyan-700">
            <span className="text-lg">🌊</span>
            Ride the Wave of Academic Success
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Navigate Your
            <br />
            <span className="bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
              Academic Journey
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
            Set sail with the AI-powered study companion that helps you chart your course,
            weather any storm, and reach your academic destinations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-teal-600 transition-all hover:shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-2 transform hover:scale-105">
              <span>⛵</span>
              Set Sail Today
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a href="#features" className="px-8 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-white dark:hover:bg-slate-700 transition-all border border-cyan-200 dark:border-cyan-700 flex items-center justify-center gap-2">
              <span>🧭</span>
              Explore Features
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* Stats - Ocean themed */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-cyan-200 dark:border-cyan-800">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">10K+</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Sailors Aboard</div>
            </div>
            <div className="p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-cyan-200 dark:border-cyan-800">
              <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">50K+</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Voyages Completed</div>
            </div>
            <div className="p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-cyan-200 dark:border-cyan-800">
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">4.9⭐</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Crew Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div className="relative h-24 overflow-hidden">
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="fill-white dark:fill-slate-800"/>
        </svg>
      </div>

      {/* Features Section - Ocean themed */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-4xl mb-4 block">🏝️</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Discover Your Island Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Powerful tools designed to help you navigate the seas of academia and reach success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 - Treasure Map */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 border border-cyan-200 dark:border-cyan-800 hover:shadow-lg transition-all hover:scale-105">
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/50 rounded-xl flex items-center justify-center mb-4 text-2xl">
                🗺️
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">AI Study Maps</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Chart your course with personalized daily study plans generated by AI navigation.
              </p>
            </div>

            {/* Feature 2 - Ship Fleet */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 border border-teal-200 dark:border-teal-800 hover:shadow-lg transition-all hover:scale-105">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/50 rounded-xl flex items-center justify-center mb-4 text-2xl">
                ⛵
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Class Fleet</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Organize your classes like ships in a fleet. Track assignments and never miss a deadline.
              </p>
            </div>

            {/* Feature 3 - Treasure Chest */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200 dark:border-amber-800 hover:shadow-lg transition-all hover:scale-105">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center mb-4 text-2xl">
                💰
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Grade Treasure</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track your grades like precious treasure. Calculate GPA and monitor your progress.
              </p>
            </div>

            {/* Feature 4 - Tidal Calendar */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 border border-sky-200 dark:border-sky-800 hover:shadow-lg transition-all hover:scale-105">
              <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900/50 rounded-xl flex items-center justify-center mb-4 text-2xl">
                🌙
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Tidal Calendar</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Visualize your schedule like ocean tides. See all assignments and events at a glance.
              </p>
            </div>

            {/* Feature 5 - Memory Reef */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border border-violet-200 dark:border-violet-800 hover:shadow-lg transition-all hover:scale-105">
              <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/50 rounded-xl flex items-center justify-center mb-4 text-2xl">
                🪸
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Memory Reef</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Auto-generate flashcards and study guides from your notes with AI coral magic.
              </p>
            </div>

            {/* Feature 6 - Lighthouse Alerts */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 border border-rose-200 dark:border-rose-800 hover:shadow-lg transition-all hover:scale-105">
              <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/50 rounded-xl flex items-center justify-center mb-4 text-2xl">
                🗼
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Lighthouse Alerts</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get timely beacon signals for upcoming due dates, tests, and study sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-slate-900 dark:to-cyan-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-4xl mb-4 block">⚓</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Set Sail in Minutes
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Three simple steps to begin your academic voyage.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-500 text-white text-2xl font-bold rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                🚢
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Board the Ship</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sign up with Google in seconds. No treasure required.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 text-white text-2xl font-bold rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                🗺️
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Chart Your Course</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Add your classes, set your schedule, and mark your destinations.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 text-white text-2xl font-bold rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                🌊
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Ride the Waves</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Let AI navigate your studies and reach every destination on time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section - Ocean themed */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-600 relative overflow-hidden">
        {/* Wave decoration */}
        <div className="absolute top-0 left-0 w-full h-20 opacity-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="white"/>
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-5xl mb-6 block">🐚</span>
          <blockquote className="text-2xl sm:text-3xl font-medium text-white mb-8">
            "StudyTide helped me navigate through my toughest semester. My GPA sailed from 3.2 to 3.8!"
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-xl">
              🧑‍🎓
            </div>
            <div className="text-left">
              <div className="font-semibold text-white">Jordan Smith</div>
              <div className="text-cyan-100">Junior, University of Virginia</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Ocean themed */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100/50 to-cyan-100/50 dark:from-cyan-900/20 dark:to-teal-900/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-5xl mb-4 block animate-float">⛵</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Set Sail?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Join thousands of sailors navigating their academic journey with StudyTide.
          </p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-teal-600 transition-all hover:shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105">
            <span>🌊</span>
            Begin Your Voyage
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            🐚 No treasure required • Free forever for basic features
          </p>
        </div>
      </section>

      {/* Footer - Ocean themed */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-900 via-teal-900 to-emerald-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌊</span>
              <span className="text-lg font-bold">
                Study<span className="text-cyan-300">Tide</span>
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-cyan-200">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
            <div className="text-sm text-cyan-300">
              © 2025 StudyTide. Smooth sailing ahead! 🐬
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
