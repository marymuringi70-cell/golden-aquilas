import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import HouseHuntingScreen from './components/HouseHuntingScreen';
import AgentDashboard from './components/AgentDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [viewPublicMarket, setViewPublicMarket] = useState(false);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setViewPublicMarket(false);
  };

  const handleLogout = () => {
    setUser(null);
    setViewPublicMarket(false);
  };

  // 1. Unauthenticated View
  if (!user && !viewPublicMarket) {
    return (
      <LoginScreen 
        onLoginSuccess={handleLoginSuccess} 
        onBrowsePublic={() => setViewPublicMarket(true)} 
      />
    );
  }

  // 2. Public Marketplace Context View
  if (viewPublicMarket) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-white p-6">
        <button 
          onClick={() => setViewPublicMarket(false)}
          className="text-xs text-[#D4AF37] border border-[#D4AF37]/40 px-3 py-1 rounded mb-4 hover:bg-[#D4AF37]/10 cursor-pointer"
        >
          ← Back to Login
        </button>
        <h1 className="text-2xl font-bold text-[#D4AF37]">Public Discovery Marketplace (Screen 1)</h1>
        <p className="text-gray-400 mt-2">This is where house hunting features live.</p>
      </div>
    );
  }

  // 3. Authenticated Role Workspace Router Layout
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#E0E0E0]">
      {/* Navigation Layer */}
      <nav className="border-b border-[#D4AF37]/20 bg-[#1A1A1A] px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-bold tracking-wider text-[#D4AF37]">GOLDEN AQUILAS</span>
          <span className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-0.5 rounded tracking-widest font-mono uppercase">
            {user.role}
          </span>
        </div>
        <button 
          onClick={handleLogout}
          className="text-xs border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-black text-[#D4AF37] px-4 py-1.5 rounded transition duration-300 font-bold cursor-pointer"
        >
          Sign Out
        </button>
      </nav>

      {/* Dynamic Interface Shell */}
      <main className="p-6">
        {/* Replace the old AGENT placeholder block with this line: */}
{user.role === 'AGENT' && <AgentDashboard />}
        {user.role === 'SUPER_ADMIN' && (
          <div className="bg-[#1A1A1A] border border-gray-800 p-6 rounded-xl">
            <h2 className="text-xl font-bold text-[#D4AF37]">Super Admin Control Dashboard</h2>
            <p className="text-gray-400 text-sm mt-1">Platform wide financial visibility and agent logs overview.</p>
          </div>
        )}


        {user.role === 'TENANT' && (
          <div className="bg-[#1A1A1A] border border-gray-800 p-6 rounded-xl">
            <h2 className="text-xl font-bold text-[#D4AF37]">Tenant Portal</h2>
            <p className="text-gray-400 text-sm mt-1">View lease terms, make M-Pesa payments, and file maintenance tickets.</p>
          </div>
        )}

        {user.role === 'STUDENT' && (
          <div className="bg-[#1A1A1A] border border-gray-800 p-6 rounded-xl">
            <h2 className="text-xl font-bold text-[#D4AF37]">Student Hostel Suite</h2>
            <p className="text-gray-400 text-sm mt-1">Manage room bookings, track per-semester fees, and bed allocation profiles.</p>
          </div>
        )}

        {user.role === 'GUEST' && (
          <div className="bg-[#1A1A1A] border border-gray-800 p-6 rounded-xl">
            <h2 className="text-xl font-bold text-[#D4AF37]">BnB Guest Hub</h2>
            <p className="text-gray-400 text-sm mt-1">Review short-stay itineraries and check access timelines.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;