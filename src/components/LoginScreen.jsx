import React, { useState } from 'react';

function LoginScreen({ onLoginSuccess, onBrowsePublic }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Fallback fallback to direct Agent access if submitted manually
      onLoginSuccess({ name: "User", email, role: "AGENT" });
    }
  };

  // Mock configuration environments to instantly switch roles for testing
  const quickRoles = [
    { label: "Super Admin Portal", role: "SUPER_ADMIN", email: "admin@goldenaquilas.com" },
    { label: "Agent Workspace", role: "AGENT", email: "agent@goldenaquilas.com" },
    { label: "Tenant Suite", role: "TENANT", email: "tenant@goldenaquilas.com" },
    { label: "Hostel Portal", role: "STUDENT", email: "student@housing.com" },
    { label: "BnB Guest Hub", role: "GUEST", email: "guest@traveler.com" }
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex flex-col items-center justify-center p-4">
      {/* Central Card */}
      <div className="w-full max-w-md bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-widest text-[#D4AF37]">GOLDEN AQUILAS</h1>
          <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">Property & Real Estate Operating System</p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-[#D4AF37] uppercase mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0B0B0B] border border-gray-800 focus:border-[#D4AF37] text-white rounded-lg px-4 py-3 text-sm focus:outline-none transition"
              placeholder="name@domain.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#D4AF37] uppercase mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0B0B0B] border border-gray-800 focus:border-[#D4AF37] text-white rounded-lg px-4 py-3 text-sm focus:outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-[#AA7C11] to-[#D4AF37] text-black font-bold uppercase tracking-wider text-sm py-3.5 rounded-lg hover:brightness-110 transition duration-300 shadow-lg cursor-pointer"
          >
            Authenticate Access
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            type="button"
            onClick={onBrowsePublic}
            className="text-xs text-gray-400 hover:text-[#D4AF37] underline transition cursor-pointer"
          >
            Browse public marketplace listings
          </button>
        </div>

        {/* Dev Environment Simulator Controls */}
        <div className="mt-8 border-t border-gray-800 pt-6">
          <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider mb-3 text-center">
            Sandbox Simulator: Click a role workspace to jump in
          </p>
          <div className="grid grid-cols-2 gap-2">
            {quickRoles.map((item) => (
              <button
                key={item.role}
                type="button"
                onClick={() => onLoginSuccess({ name: `Demo ${item.role}`, email: item.email, role: item.role })}
                className="bg-[#0B0B0B] border border-gray-800 text-left px-3 py-2 rounded text-xs text-gray-300 hover:border-[#D4AF37]/60 hover:text-[#D4AF37] transition text-nowrap overflow-hidden text-ellipsis cursor-pointer"
              >
                {item.label} →
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;