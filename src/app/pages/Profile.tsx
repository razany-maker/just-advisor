import { User, Mail, Book, Target, Award, Calendar, Sparkles } from "lucide-react";

export function Profile() {
  return (
    <div className="h-full flex flex-col p-4 md:p-8 max-w-5xl mx-auto w-full relative z-0">
      <div className="mb-8 relative">
        <h1 className="text-3xl font-extrabold text-[#1F2D4D] flex items-center">
          Student Profile <Sparkles className="w-6 h-6 ml-3 text-yellow-500" />
        </h1>
        <p className="text-[#263C74] font-bold text-sm mt-1">Track your progress and celebrate your wins!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-1 bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-xl border border-white/50 overflow-hidden transform transition-all hover:scale-[1.02] duration-300">
          <div className="bg-gradient-to-br from-[#263C74] to-[#1F2D4D] h-32 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          </div>
          <div className="px-8 pb-8 relative">
            <div className="w-24 h-24 bg-white rounded-3xl p-1.5 absolute -top-12 left-8 shadow-xl rotate-3 transition-transform hover:rotate-0">
              <div className="w-full h-full bg-gradient-to-br from-[#E7ECF0] to-white rounded-2xl flex items-center justify-center text-3xl font-extrabold text-[#263C74] shadow-inner border border-gray-100">
                BA
              </div>
            </div>
            <div className="pt-16">
              <h2 className="text-2xl font-extrabold text-[#1F2D4D]">Bushra Al momani</h2>
              <div className="inline-block mt-2 mb-6 px-3 py-1 bg-[#263C74]/10 text-[#263C74] rounded-full text-xs font-bold border border-[#263C74]/20">
                3rd Year
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center text-sm font-semibold text-[#1F2D4D]/80">
                  <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center mr-3 text-gray-500">
                    <User className="w-4 h-4" />
                  </div>
                  <span>11223344</span>
                </div>
                <div className="flex items-center text-sm font-semibold text-[#1F2D4D]/80">
                  <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center mr-3 text-gray-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="truncate">bm1122@cit.just.edu.jo</span>
                </div>
                <div className="flex items-center text-sm font-semibold text-[#1F2D4D]/80">
                  <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center mr-3 text-gray-500">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span>Enrolled: Fall 2021</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Stats */}
        <div className="md:col-span-2 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] shadow-md border border-white flex flex-col justify-center transform transition-transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
                <Target className="w-7 h-7" />
              </div>
              <p className="text-xs font-extrabold text-[#1F2D4D]/50 uppercase tracking-wider mb-1">Cumulative GPA</p>
              <p className="text-3xl font-extrabold text-[#1F2D4D]">3.42</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] shadow-md border border-white flex flex-col justify-center transform transition-transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
                <Book className="w-7 h-7" />
              </div>
              <p className="text-xs font-extrabold text-[#1F2D4D]/50 uppercase tracking-wider mb-1">Credits Passed</p>
              <p className="text-3xl font-extrabold text-[#1F2D4D]">84 <span className="text-lg text-gray-400">/ 132</span></p>
            </div>

            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] shadow-md border border-white flex flex-col justify-center transform transition-transform hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 text-yellow-300 opacity-20">
                <Award className="w-32 h-32" />
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-[#D03028]/20 to-[#D03028]/5 text-[#D03028] rounded-2xl flex items-center justify-center mb-4 shadow-inner relative z-10">
                <Award className="w-7 h-7" />
              </div>
              <p className="text-xs font-extrabold text-[#1F2D4D]/50 uppercase tracking-wider mb-1 relative z-10">Academic Status</p>
              <p className="text-2xl font-extrabold text-[#D03028] relative z-10">Excellent</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-xl border border-white/50 p-8">
            <h3 className="text-xl font-extrabold text-[#1F2D4D] mb-6">Upcoming Deadlines & Exams ⏰</h3>
            <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
              <div className="flex items-center justify-between p-4 bg-[#E7ECF0]/50 rounded-2xl hover:bg-[#E7ECF0] transition-colors">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center font-bold text-lg mr-4">
                    12
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#1F2D4D]">CS311 Midterm Exam</h4>
                    <p className="text-xs font-semibold text-[#1F2D4D]/60 mt-0.5">Database Systems • Hall A</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[#D03028] bg-[#D03028]/10 px-3 py-1 rounded-full text-xs">In 2 Days</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-[#E7ECF0]/50 rounded-2xl hover:bg-[#E7ECF0] transition-colors">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center font-bold text-lg mr-4">
                    15
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#1F2D4D]">CS284 Assignment 3</h4>
                    <p className="text-xs font-semibold text-[#1F2D4D]/60 mt-0.5">Analysis of Algorithms • e-Learning</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full text-xs">In 5 Days</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-[#E7ECF0]/50 rounded-2xl hover:bg-[#E7ECF0] transition-colors">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#263C74]/10 text-[#263C74] rounded-xl flex items-center justify-center font-bold text-lg mr-4">
                    22
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#1F2D4D]">SE320 Project Proposal</h4>
                    <p className="text-xs font-semibold text-[#1F2D4D]/60 mt-0.5">System Analysis • Group Submission</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[#263C74] bg-[#263C74]/10 px-3 py-1 rounded-full text-xs">Next Week</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
