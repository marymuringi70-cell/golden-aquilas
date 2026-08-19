import React, { useState } from 'react';

export default function BnbGuestHub({ user }) {
  const [phone, setPhone] = useState('0712345678');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Mock short-stay booking details
  const bookingDetails = {
    property: "The Obsidian Luxury Studio (BnB)",
    location: "Kilimani, Nairobi",
    checkIn: "14:00 — Today",
    checkOut: "11:00 — 14 Aug 2026",
    nights: 3,
    nightlyRate: 4500,
    doorPin: "8842#",
    wifiPass: "GoldenAquilas2026"
  };

  const totalAmount = bookingDetails.nights * bookingDetails.nightlyRate;

  const handleBnbPayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentSuccess(false);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2500);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-wider text-[#D4AF37]">BNB GUEST HUB</h2>
        <p className="text-xs text-gray-400 uppercase mt-1">Short-Stay Access Pass & Instant Checkout</p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT TWO COLUMNS: Reservation Card & Self Check-In Instructions */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Stay Card */}
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-start border-b border-gray-800 pb-4 mb-4">
              <div>
                <h3 className="font-bold text-lg text-white">{bookingDetails.property}</h3>
                <p className="text-xs text-gray-400">{bookingDetails.location}</p>
              </div>
              <span className="text-[10px] bg-green-500/10 text-green-400 border border-green-500/30 px-2.5 py-1 rounded font-mono font-bold tracking-wider">
                RESERVATION CONFIRMED
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div>
                <span className="block text-[10px] uppercase text-gray-500 font-bold tracking-wider">Check-In</span>
                <span className="text-xs font-semibold text-gray-300 mt-1 block">{bookingDetails.checkIn}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-gray-500 font-bold tracking-wider">Check-Out</span>
                <span className="text-xs font-semibold text-gray-300 mt-1 block">{bookingDetails.checkOut}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-gray-500 font-bold tracking-wider">Duration</span>
                <span className="text-xs font-semibold text-gray-300 mt-1 block">{bookingDetails.nights} Nights</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-gray-500 font-bold tracking-wider">Total Charge</span>
                <span className="text-base font-extrabold text-[#D4AF37]">Ksh {totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Keyless Digital Smart Door & Amenities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Keypad PIN Access */}
            <div className="bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl p-6 text-center">
              <span className="text-2xl block mb-2">🔐</span>
              <span className="text-xs text-gray-400 uppercase font-bold tracking-wider block">Smart Keypad Door PIN</span>
              <span className="text-2xl font-mono font-extrabold text-[#D4AF37] tracking-widest mt-2 block bg-[#0B0B0B] py-2 border border-gray-800 rounded-lg">
                {bookingDetails.doorPin}
              </span>
              <p className="text-[10px] text-gray-500 mt-2">Enter code on door handle followed by #</p>
            </div>

            {/* High-Speed Wi-Fi */}
            <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 text-center">
              <span className="text-2xl block mb-2">📶</span>
              <span className="text-xs text-gray-400 uppercase font-bold tracking-wider block">Guest High-Speed Wi-Fi</span>
              <span className="text-sm font-mono font-bold text-white tracking-wider mt-2 block bg-[#0B0B0B] py-3 border border-gray-800 rounded-lg">
                {bookingDetails.wifiPass}
              </span>
              <p className="text-[10px] text-gray-500 mt-2">Unlimited 100Mbps Fiber Stream</p>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: Express M-Pesa Booking Clearance */}
        <div className="bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-4">
              <h3 className="font-bold text-lg text-[#D4AF37]">Pay Daily Rate</h3>
              <span className="text-xl">🍸</span>
            </div>

            <p className="text-xs text-gray-400 mb-6">
              Clear your stay charges or extend your stay using express M-Pesa STK Push.
            </p>

            <form onSubmit={handleBnbPayment} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">M-Pesa Phone Number</label>
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
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Total Stay Rate ({bookingDetails.nights} Nights)</label>
                <div className="bg-[#0B0B0B] border border-gray-800 text-[#D4AF37] font-bold rounded-lg px-4 py-3 text-sm font-mono">
                  Ksh {totalAmount.toLocaleString()}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isProcessing}
                className={`w-full bg-gradient-to-r from-[#AA7C11] to-[#D4AF37] text-black font-extrabold uppercase tracking-wider text-xs py-3.5 rounded-lg transition shadow-lg cursor-pointer ${
                  isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110'
                }`}
              >
                {isProcessing ? "Prompting Phone..." : "Pay for Stay"}
              </button>
            </form>

            {paymentSuccess && (
              <div className="mt-4 bg-green-500/10 border border-green-500/30 text-green-400 p-3 rounded-lg text-xs animate-fadeIn">
                ✓ <strong>STK Prompt Sent!</strong> Confirm the payment on your phone to complete instant check-in.
              </div>
            )}
          </div>

          <div className="mt-6 text-center border-t border-gray-800 pt-4">
            <span className="text-[10px] text-gray-500 uppercase font-mono">Automated Door PIN Key Generator</span>
          </div>
        </div>

      </div>
    </div>
  );
}