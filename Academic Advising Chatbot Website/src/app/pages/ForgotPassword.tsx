import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Mail, ShieldAlert } from "lucide-react";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#E7ECF0] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-[#FFFFFF] rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8">
        {!submitted ? (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#E7ECF0] rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldAlert className="w-8 h-8 text-[#263C74]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1F2D4D]">Reset Password</h2>
              <p className="text-[#1F2D4D] opacity-70 mt-2 text-sm">
                Enter your university email address and we'll send you instructions to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#1F2D4D] mb-2">University Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#263C74] focus:border-[#263C74] outline-none transition-all text-[#1F2D4D] bg-gray-50"
                    placeholder="student@cit.just.edu.jo"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-[#FFFFFF] bg-[#263C74] hover:bg-[#1F2D4D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#263C74] transition-colors"
              >
                Send Reset Link
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#E7ECF0] rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-[#263C74]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1F2D4D] mb-2">Check your email</h2>
            <p className="text-[#1F2D4D] opacity-70 text-sm mb-6">
              We have sent password reset instructions to <br />
              <span className="font-semibold">{email}</span>
            </p>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link to="/login" className="inline-flex items-center text-sm font-medium text-[#263C74] hover:text-[#1F2D4D] transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
