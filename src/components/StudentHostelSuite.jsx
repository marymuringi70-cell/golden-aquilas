import React, { useState } from 'react';

export default function StudentHostelSuite({ user }) {
  const [phone, setPhone] = useState('0712345678');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Maintenance State
  const [issueCategory, setIssueCategory] = useState('Plumbing / Bathroom');
  const [description, setDescription] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const hostelDetails = {
    property: "Qwetu Suburbia Student Residence",
    room: "Block B — Room 204",
    bedSpace: "Bed A (Window Side)",
    semesterFee: 25000,
    paidAmount: 12500,
    semester: "Semester I (2026/2027)",
    amenities: ["High-Speed Wi-Fi", "Study Lounge Access", "Biometric Access Control"]
  };

  const balanceDue = hostelDetails.semesterFee - hostelDetails.paidAmount;

  const handleFeePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentSuccess(false);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2500);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleMaintenanceSubmit = (e) => {
    e.preventDefault();
    setTicketSubmitted(true);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-extrabold tracking-wider text-[#D4AF37]">STUDENT HOSTEL SUITE</h2>
        <p className="text-xs text-gray-400 uppercase mt-1">Bed Space Allocation & Room Management</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Residence & Maintenance */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Hostel Summary */}
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-start border-b border-gray-800 pb-4 mb-4">
              <div>
                <h3 className="font-bold text-lg text-white">{hostelDetails.property}</h3>
                <p className="text-xs text-gray-400">{hostelDetails.room} • <span className="text-[#D4AF37] font-semibold">{hostelDetails.bedSpace}</span></p>
              </div>
              <span className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 px-2.5 py-1 rounded font-mono font-bold tracking-wider">
                CONFIRMED BED
              </span>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Semester Fee Payment Status:</span>
                <span className="font-mono text-[#D4AF37] font-bold">
                  Ksh {hostelDetails.paidAmount.toLocaleString()} / Ksh {hostelDetails.semesterFee.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-[#0B0B0B] border border-gray-800 h-3 rounded-full overflow-hidden p-0.5">
                <div 
                  className="bg-gradient-to-r from-[#AA7C11] to-[#D4AF37] h-full rounded-full transition-all duration-500" 
                  style={{ width: `${(hostelDetails.paidAmount / hostelDetails.semesterFee) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <span className="block text-[10px] uppercase text-gray-500 font-bold tracking-wider">Academic Term</span>
                <span className="text-xs font-semibold text-gray-300 mt-1 block">{hostelDetails.semester}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-gray-500 font-bold tracking-wider">Outstanding Balance</span>
                <span className="text-base font-extrabold text-red-400">Ksh {balanceDue.toLocaleString()}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-gray-500 font-bold tracking-wider">Passcode Access</span>
                <span className="text-xs font-mono text-green-400 mt-1 block">ACTIVE (GATE PASS)</span>
              </div>
            </div>
          </div>

          {/* ROOM MAINTENANCE / REPAIR MODULE WITH PHOTO ATTACHMENT */}
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 space-y-4">
            <div className="border-b border-gray-800 pb-3">
              <h3 className="font-bold text-lg text-white">🛠️ Room Maintenance & Incident Ticket</h3>
              <p className="text-xs text-gray-400">Report broken room fixtures directly to hostel caretaker with a photo</p>
            </div>

            {ticketSubmitted ? (
              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg text-xs text-green-400 space-y-2">
                <p className="font-bold">✓ Hostel Caretaker Dispatched!</p>
                <p className="text-gray-300">Ticket logged for <strong>{hostelDetails.room}</strong>. A technician will inspect the issue today.</p>
                <button 
                  onClick={() => { setTicketSubmitted(false); setPreviewUrl(null); setDescription(''); }}
                  className="mt-2 text-[10px] text-[#D4AF37] underline cursor-pointer"
                >
                  Submit another report
                </button>
              </div>
            ) : (
              <form onSubmit={handleMaintenanceSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Issue Category</label>
                    <select 
                      value={issueCategory}
                      onChange={(e) => setIssueCategory(e.target.value)}
                      className="w-full bg-[#0B0B0B] border border-gray-800 text-white rounded-lg px-3 py-2.5 text-xs focus:border-[#D4AF37] focus:outline-none"
                    >
                      <option value="Plumbing / Bathroom">Plumbing / Water Supply</option>
                      <option value="Electrical / Lighting">Light Bulb / Desk Power Socket</option>
                      <option value="Furniture">Study Table / Bed Frame Damage</option>
                      <option value="Wi-Fi / Ethernet">LAN Port / Router Connectivity</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Attach Photo</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="w-full text-xs text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#D4AF37] file:text-black hover:file:brightness-110 cursor-pointer"
                    />
                  </div>
                </div>

                {previewUrl && (
                  <div className="relative w-28 h-28 border border-[#D4AF37]/50 rounded-lg overflow-hidden bg-black">
                    <img src={previewUrl} alt="Hostel Repair Preview" className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[9px] text-center text-[#D4AF37] py-0.5 font-mono">
                      Photo Attached
                    </span>
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Details</label>
                  <textarea 
                    rows="2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="E.g., Overhead fluorescent tube flickering in Block B room 204..."
                    className="w-full bg-[#0B0B0B] border border-gray-800 text-white rounded-lg p-3 text-xs focus:border-[#D4AF37] focus:outline-none"
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="bg-[#D4AF37] text-black font-extrabold uppercase tracking-wider text-xs px-6 py-2.5 rounded-lg hover:brightness-110 transition cursor-pointer"
                >
                  Dispatch Caretaker
                </button>
              </form>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: Semester Fee Checkout */}
        <div className="bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl p-6 flex flex-col justify-between h-fit">
          <div>
            <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-4">
              <h3 className="font-bold text-lg text-[#D4AF37]">Clear Semester Balance</h3>
              <span className="text-xl">🎓</span>
            </div>

            <p className="text-xs text-gray-400 mb-6">
              Pay remaining fees directly via M-Pesa to maintain active door keycard clearance.
            </p>

            <form onSubmit={handleFeePayment} className="space-y-4">
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
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Payable Balance</label>
                <div className="bg-[#0B0B0B] border border-gray-800 text-[#D4AF37] font-bold rounded-lg px-4 py-3 text-sm font-mono">
                  Ksh {balanceDue.toLocaleString()}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isProcessing}
                className={`w-full bg-gradient-to-r from-[#AA7C11] to-[#D4AF37] text-black font-extrabold uppercase tracking-wider text-xs py-3.5 rounded-lg transition shadow-lg cursor-pointer ${
                  isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110'
                }`}
              >
                {isProcessing ? "Prompting Phone..." : "Pay Hostel Fee"}
              </button>
            </form>

            {paymentSuccess && (
              <div className="mt-4 bg-green-500/10 border border-green-500/30 text-green-400 p-3 rounded-lg text-xs animate-fadeIn">
                ✓ <strong>STK Push Sent!</strong> Complete the transaction on your phone.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}