import React, { useState } from 'react';

export default function BnbGuestHub({ user }) {
  const [phone, setPhone] = useState('0712345678');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Repair Request State
  const [issueType, setIssueType] = useState('Plumbing');
  const [description, setDescription] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [repairSubmitted, setRepairSubmitted] = useState(false);

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

  // Handle Photo Selection
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedPhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Handle Maintenance Form Submission
  const handleRepairSubmit = (e) => {
    e.preventDefault();
    setRepairSubmitted(true);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-extrabold tracking-wider text-[#D4AF37]">BNB GUEST HUB</h2>
        <p className="text-xs text-gray-400 uppercase mt-1">Short-Stay Access Pass & Guest Services</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT MAIN COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Reservation Overview */}
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

          {/* Access Credentials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl p-6 text-center">
              <span className="text-2xl block mb-2">🔐</span>
              <span className="text-xs text-gray-400 uppercase font-bold tracking-wider block">Smart Keypad Door PIN</span>
              <span className="text-2xl font-mono font-extrabold text-[#D4AF37] tracking-widest mt-2 block bg-[#0B0B0B] py-2 border border-gray-800 rounded-lg">
                {bookingDetails.doorPin}
              </span>
            </div>

            <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 text-center">
              <span className="text-2xl block mb-2">📶</span>
              <span className="text-xs text-gray-400 uppercase font-bold tracking-wider block">Guest High-Speed Wi-Fi</span>
              <span className="text-sm font-mono font-bold text-white tracking-wider mt-2 block bg-[#0B0B0B] py-3 border border-gray-800 rounded-lg">
                {bookingDetails.wifiPass}
              </span>
            </div>
          </div>

          {/* NEW SECTION: MAINTENANCE & REPAIR PHOTO UPLOADER */}
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 space-y-4">
            <div className="border-b border-gray-800 pb-3 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg text-white">🛠️ Report Issue / Repair Request</h3>
                <p className="text-xs text-gray-400">Attach a photo of any broken item or damage for rapid technician dispatch</p>
              </div>
            </div>

            {repairSubmitted ? (
              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg text-xs text-green-400 space-y-2">
                <p className="font-bold">✓ Repair Request Logged & Photo Attached!</p>
                <p className="text-gray-300">Property management notified. A technician is being dispatched to <strong>Kilimani Studio #204</strong>.</p>
                <button 
                  onClick={() => { setRepairSubmitted(false); setPreviewUrl(null); setSelectedPhoto(null); setDescription(''); }}
                  className="mt-2 text-[10px] text-[#D4AF37] underline cursor-pointer"
                >
                  Submit another report
                </button>
              </div>
            ) : (
              <form onSubmit={handleRepairSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Issue Category</label>
                    <select 
                      value={issueType}
                      onChange={(e) => setIssueType(e.target.value)}
                      className="w-full bg-[#0B0B0B] border border-gray-800 text-white rounded-lg px-3 py-2.5 text-xs focus:border-[#D4AF37] focus:outline-none"
                    >
                      <option value="Plumbing">Plumbing / Water Leak</option>
                      <option value="Electrical">Lighting / Electrical Appliance</option>
                      <option value="Internet">Wi-Fi Router / Smart TV</option>
                      <option value="Lock">Door Lock / Keypad Access</option>
                      <option value="Cleanliness">Housekeeping / Cleaning Need</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Attach Repair Photo</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="w-full text-xs text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#D4AF37] file:text-black hover:file:brightness-110 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Photo Preview Card */}
                {previewUrl && (
                  <div className="relative w-32 h-32 border border-[#D4AF37]/50 rounded-lg overflow-hidden bg-black">
                    <img src={previewUrl} alt="Repair Preview" className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[9px] text-center text-[#D4AF37] py-0.5 font-mono">
                      Attached Image
                    </span>
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Issue Description</label>
                  <textarea 
                    rows="2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Briefly describe what needs fixing (e.g., 'Hot shower tap is leaking onto the bathroom floor')..."
                    className="w-full bg-[#0B0B0B] border border-gray-800 text-white rounded-lg p-3 text-xs focus:border-[#D4AF37] focus:outline-none"
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="bg-[#D4AF37] text-black font-extrabold uppercase tracking-wider text-xs px-6 py-2.5 rounded-lg hover:brightness-110 transition cursor-pointer"
                >
                  Submit Repair Ticket
                </button>
              </form>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: PAYMENT CLEARANCE */}
        <div className="bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl p-6 flex flex-col justify-between h-fit">
          <div>
            <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-4">
              <h3 className="font-bold text-lg text-[#D4AF37]">Pay Daily Rate</h3>
              <span className="text-xl">🍸</span>
            </div>

            <p className="text-xs text-gray-400 mb-6">
              Clear stay charges or extend your booking duration via express M-Pesa.
            </p>

            <form onSubmit={handleBnbPayment} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">M-Pesa Phone Number</label>
                <input 
                  type="text" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0B0B0B] border border-gray-800 focus:border-[#D4AF37] text-white rounded-lg px-4 py-3 text-sm font-mono focus:outline-none"
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
                ✓ <strong>STK Prompt Sent!</strong> Complete payment on your phone.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}