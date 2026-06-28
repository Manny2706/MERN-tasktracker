import { CheckSquare } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Left */}

        <div className="flex items-center gap-4">

          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">

            <CheckSquare className="text-white" size={24} />

          </div>

          <div>

            <h1 className="text-2xl font-bold   ">
              Task Tracker
            </h1>

            <p className="text-sm text-slate-500">
              Manage • Organize • Complete
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          <div className="hidden md:flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl">

            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>

            <span className="text-sm font-medium text-slate-600">
              Connected
            </span>

          </div>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl shadow-md font-medium">
            MERN Stack
          </div>

        </div>

      </div>
    </header>
  );
};

export default Navbar;