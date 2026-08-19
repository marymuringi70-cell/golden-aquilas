import React, { useState } from 'react';

export default function TenantPortal({ user }) {
  const [phone, setPhone] = useState('0712345678');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Mock lease metadata
  const leaseDetails = {
    property: "Apex Heights Apartments",
    unit: "Apt 4B",
    rentAmount: 45000,
    dueDate: "5th of every month",
    status: "DUE_SOON"
  };

  const handleMpesaPay = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentSuccess(false);

    // Simulate M-Pesa Daraja STK Push prompt delay
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2500);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-wider text-[#D4AF37]">TENANT PORTAL</h2>
        <p className="text-xs text-gray-400 uppercase mt-1">Lease Status & Express M-Pesa Payment Hub</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT COLUMN: Lease Overview & Maintenance */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Lease Summary Card */}
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-start border-b border-gray-800 pb-4 mb-4">
              <div>
                <h3 className="font-bold text-lg text-white">{leaseDetails.property}</h3>
                <p className="text-xs text-gray-400">{leaseDetails.unit} — Signed Active Lease</p>
              </div>
              <span className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 px-2.5 py-1 rounded font-mono font-bold tracking-wider">
                ACTIVE LEASE
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <span className="block text-[10px] uppercase text-gray-500 font-bold tracking-wider">Monthly Rent</span>
                <span className="text-base font-extrabold text-[#D4AF37]">Ksh {leaseDetails.rentAmount.toLocaleString()}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-gray-500 font-bold tracking-wider">Due Schedule</span>
                <span className="text-xs font-semibold text-gray-300 mt-1 block">{leaseDetails.dueDate}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-gray-500 font-bold tracking-wider">Water / Amenities</span>
                <span className="text-xs font-semibold text-green-400 mt-1 block">Included</span>
              </div>
            </div>
          </div>

          {/* Quick Maintenance Desk */}
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
            <h3 className="font-bold text-lg text-white border-b border-gray-800 pb-4 mb-4">Maintenance Requests</h3>
            <p className="text-xs text-gray-400 mb-4">Report unit repair issues directly to management.</p>

            <form onSubmit={(e) => { e.preventDefault(); alert("Ticket filed successfully with agent!"); }} className="space-y-4">
              <input 
                type="text" 
                placeholder="Issue Summary (e.g. Bathroom sink pipe leak)" 
                className="w-full bg-[#0B0B0B] border border-gray-800 focus:border-[#D4AF37] text-white rounded-lg px-4 py-2.5 text-xs focus:outline-none"
                required
              />
              <button 
                type="submit" 
                className="bg-[#0B0B0B] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-bold text-xs px-4 py-2 rounded-lg transition cursor-pointer"
              >
                Submit Maintenance Ticket
              </button>
            </form>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive M-Pesa STK Push Simulator */}
        <div className="bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-4">
              <h3 className="font-bold text-lg text-[#D4AF37]">M-Pesa Express Rent</h3>
              <span className="text-xl">📱</span>
            </div>

            <p className="text-xs text-gray-400 mb-6">
              Enter your M-Pesa phone number below to trigger an instant STK PIN prompt on your phone.
            </p>

            <form onSubmit={handleMpesaPay} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Payer Phone Number</label>
                <input 
                  type="text" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0B0B0B] border border-gray-800 focus:border-[#D4AF37] text-white rounded-lg px-4 py-3 text-sm font-mono focus:outline-none"
                  placeholder="07XX XXX XXX"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Amount Due</label>
                <div className="bg-[#0B0B0B] border border-gray-800 text-[#D4AF37] font-bold rounded-lg px-4 py-3 text-sm font-mono">
                  Ksh {leaseDetails.rentAmount.toLocaleString()}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isProcessing}
                className={`w-full bg-gradient-to-r from-[#AA7C11] to-[#D4AF37] text-black font-extrabold uppercase tracking-wider text-xs py-3.5 rounded-lg transition shadow-lg cursor-pointer ${
                  isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110'
                }`}
              >
                {isProcessing ? "Sending STK Prompt..." : "Trigger M-Pesa Payment"}
              </button>
            </form>

            {/* Callback Status Notice */}
            {paymentSuccess && (
              <div className="mt-4 bg-green-500/10 border border-green-500/30 text-green-400 p-3 rounded-lg text-xs animate-fadeIn">
                ✓ <strong>STK Push Initiated!</strong> Check your handset for the PIN prompt. Reconciliation will update automatically upon completion.
              </div>
            )}
          </div>

          <div className="mt-6 text-center border-t border-gray-800 pt-4">
            <span className="text-[10px] text-gray-500 uppercase font-mono">Powered by Safaricom Daraja API</span>
          </div>
        </div>

      </div>
    </div>
  );
}