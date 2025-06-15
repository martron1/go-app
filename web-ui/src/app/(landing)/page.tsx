import LoginButton from '@/components/loginButton';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">FocusFlow</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How It Works</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Testimonials</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
            </nav>
            <div className="flex items-center space-x-4">
              <LoginButton />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                Sign up
              </button>
              {/* Mobile menu button */}
              <button className="md:hidden text-gray-600 hover:text-gray-900">
                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Add padding to account for fixed header */}
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 transition-opacity hover:opacity-90">
              Focus on What Matters Most
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Break down large projects into manageable 10-30 minute tasks. Stay productive, organized, and in control of your work.
            </p>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
              Start Breaking Down Your Work
            </button>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">How FocusFlow Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  title: "Create Projects",
                  description: "Organize your work into Personal and Work projects",
                  icon: "📁",
                },
                {
                  title: "Break Down Tasks",
                  description: "Split projects into small, manageable subtasks",
                  icon: "✂️",
                },
                {
                  title: "Track Progress",
                  description: "Complete tasks using our Pomodoro timer",
                  icon: "📈",
                },
              ].map((step, index) => (
                <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">Key Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Project Organization",
                  description: "Separate personal and work tasks",
                },
                {
                  title: "Smart Time Estimates",
                  description: "Plan your day with accurate timings",
                },
                {
                  title: "Pomodoro Timer",
                  description: "Stay focused with built-in timer",
                },
                {
                  title: "Progress Analytics",
                  description: "Track your productivity trends",
                },
              ].map((feature, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">What Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  quote: "FocusFlow helped me organize my startup tasks and increased my productivity by 40%.",
                  author: "Sarah J.",
                  role: "Entrepreneur",
                },
                {
                  quote: "The Pomodoro timer integration is perfect for maintaining focus during complex projects.",
                  author: "Mike R.",
                  role: "Software Developer",
                },
                {
                  quote: "Finally, a task manager that understands how to break down large projects effectively.",
                  author: "Emily L.",
                  role: "Project Manager",
                },
              ].map((testimonial, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 italic mb-4">&quot;{testimonial.quote}&quot;</p>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to boost your productivity?</h2>
            <p className="text-xl text-gray-600 mb-8">Sign up free — No credit card required</p>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
              Get Started Now
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white text-gray-600 pt-12 pb-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-900 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} FocusFlow. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
