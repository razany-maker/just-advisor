import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { LogIn, Lock, User } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import justLogo from "../../imports/WhatsApp_Image_2026-05-25_at_10.09.31_PM.jpeg";

export function Login() {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/app/chat");
  };

  return (
    <div className="min-h-screen bg-[#141C30] relative overflow-hidden flex flex-col justify-center items-center p-4">
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      {/* Playful Background Shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#263C74] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#D03028] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-[#1F2D4D] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden border border-white/50 z-10 transform transition-all hover:scale-[1.01]">
        <div className="bg-gradient-to-br from-[#263C74] to-[#1F2D4D] p-10 text-center relative overflow-hidden">
          <div className="w-28 h-28 bg-[#FFFFFF] rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl transform transition-transform hover:rotate-[360deg] duration-1000 ease-in-out border-4 border-white/20 overflow-hidden">
            <ImageWithFallback 
              src={justLogo} 
              alt="Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-extrabold text-[#FFFFFF] tracking-tight">UniGuide</h1>
          <p className="text-[#E7ECF0] text-sm mt-2 opacity-90 font-medium bg-white/10 inline-block px-4 py-1 rounded-full backdrop-blur-sm">Computer Science Students Advisor</p>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="group">
              <label className="block text-sm font-bold text-[#1F2D4D] mb-2 ml-1">Student ID</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-[#263C74] group-focus-within:text-[#D03028] transition-colors" />
                </div>
                <input
                  type="text"
                  required
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 border-2 border-[#E7ECF0] rounded-2xl focus:ring-4 focus:ring-[#263C74]/20 focus:border-[#263C74] outline-none transition-all text-[#1F2D4D] bg-white font-medium shadow-sm hover:border-[#263C74]/50"
                  placeholder="e.g. 112233"
                />
              </div>
            </div>

            <div className="group">
              <div className="flex items-center justify-between mb-2 ml-1">
                <label className="block text-sm font-bold text-[#1F2D4D]">Password</label>
                <Link to="/forgot-password" className="text-sm font-bold text-[#D03028] hover:text-[#263C74] transition-colors">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#263C74] group-focus-within:text-[#D03028] transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 border-2 border-[#E7ECF0] rounded-2xl focus:ring-4 focus:ring-[#263C74]/20 focus:border-[#263C74] outline-none transition-all text-[#1F2D4D] bg-white font-medium shadow-sm hover:border-[#263C74]/50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-2xl shadow-lg shadow-[#263C74]/30 text-lg font-bold text-[#FFFFFF] bg-[#263C74] hover:bg-[#D03028] hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-[#D03028]/50 transition-all duration-300"
            >
              <LogIn className="w-6 h-6 mr-2" />
              Let's Go!
            </button>
          </form>
        </div>
      </div>
      
      <p className="mt-8 text-sm font-semibold text-[#1F2D4D] opacity-60 z-10 bg-white/40 px-4 py-2 rounded-full backdrop-blur-md">
        © {new Date().getFullYear()} Jordan University of Science and Technology
      </p>
    </div>
  );
}
