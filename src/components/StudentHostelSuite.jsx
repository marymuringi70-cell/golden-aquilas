import React, { useState, useEffect } from 'react';

export default function StudentHostelSuite({ user }) {
  const [hostels, setHostels] = useState([]);
  const [ticketData, setTicketData] = useState({ category: 'Plumbing', description: '', unit: '' });
  const [file, setFile] = useState(null);
  const [statusMsg, setStatusMsg] = useState('');

  // Fetch Hostel listings from MongoDB
  useEffect(() => {
    fetch('http://localhost:5000/api/properties')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setHostels(data.filter((p) => p.category === 'Hostel'));
        }
      });
  }, []);

  // Submit Maintenance Ticket with photo upload to backend
  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('category', ticketData.category);
    formData.append('description', ticketData.description);
    formData.append('unit', ticketData.unit);
    formData.append('property', 'Qwetu Suburbia');
    formData.append('guest', user?.name || 'Student Resident');
    if (file) formData.append('photo', file);

    try {
      const res = await fetch('http://localhost:5000/api/tickets', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setStatusMsg('Ticket submitted successfully to Admin!');
        setTicketData({ category: 'Plumbing', description: '', unit: '' });
        setFile(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#111] p-6 rounded-2xl border border-gray-800 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-[#D4AF37]">Student Hostel Portal</h2>
          <p className="text-xs text-gray-400">Welcome back, {user?.name || 'Student'}</p>
        </div>
        <span className="bg-[#D4AF37]/20 text-[#D4AF37] px-3 py-1 rounded-full text-xs font-mono font-bold">
          Active Student Session
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Submit Issue Card */}
        <div className="bg-[#111] p-6 rounded-2xl border border-gray-800 space-y-4">
          <h3 className="text-md font-bold text-white">Report Room Repair</h3>
          {statusMsg && <p className="text-xs text-green-400 font-mono">{statusMsg}</p>}
          <form onSubmit={handleSubmitTicket} className="space-y-3">
            <div>
              <label className="text-[10px] text-gray-400 uppercase font-mono">Room / Unit #</label>
              <input
                type="text"
                required
                placeholder="e.g. Block B - Room 204"
                value={ticketData.unit}
                onChange={(e) => setTicketData({ ...ticketData, unit: e.target.value })}
                className="w-full bg-[#0B0B0B] border border-gray-800 text-white rounded-xl p-2.5 text-xs outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 uppercase font-mono">Category</label>
              <select
                value={ticketData.category}
                onChange={(e) => setTicketData({ ...ticketData, category: e.target.value })}
                className="w-full bg-[#0B0B0B] border border-gray-800 text-white rounded-xl p-2.5 text-xs outline-none"
              >
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Wi-Fi / Internet">Wi-Fi / Internet</option>
                <option value="Furniture / Door">Furniture / Door</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-gray-400 uppercase font-mono">Issue Description</label>
              <textarea
                required
                rows="3"
                value={ticketData.description}
                onChange={(e) => setTicketData({ ...ticketData, description: e.target.value })}
                className="w-full bg-[#0B0B0B] border border-gray-800 text-white rounded-xl p-2.5 text-xs outline-none focus:border-[#D4AF37]"
              ></textarea>
            </div>
            <div>
              <label className="text-[10px] text-gray-400 uppercase font-mono">Attach Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full bg-[#0B0B0B] border border-gray-800 text-gray-400 rounded-xl p-2 text-xs"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-[#b5942f] text-black font-extrabold py-2.5 rounded-xl text-xs transition cursor-pointer"
            >
              Submit Maintenance Request
            </button>
          </form>
        </div>

        {/* Live Hostel Listings */}
        <div className="bg-[#111] p-6 rounded-2xl border border-gray-800 space-y-4">
          <h3 className="text-md font-bold text-white">Available Hostel Residences</h3>
          <div className="space-y-3">
            {hostels.map((h) => (
              <div key={h._id} className="bg-[#1A1A1A] p-4 rounded-xl border border-gray-800 flex gap-4">
                <img src={h.imageUrl} alt={h.title} className="w-20 h-20 object-cover rounded-lg" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white">{h.title}</h4>
                  <p className="text-[10px] text-gray-400">📍 {h.location}</p>
                  <p className="text-xs font-extrabold text-[#D4AF37]">
                    KES {h.price.toLocaleString()} <span className="text-[9px] font-normal text-gray-400">{h.period}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}