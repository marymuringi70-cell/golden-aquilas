import React, { useState, useEffect } from 'react';

export default function BnbGuestHub() {
  const [bnbs, setBnbs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/properties')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBnbs(data.filter((p) => p.category === 'BnB'));
        }
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-[#111] p-6 rounded-2xl border border-gray-800">
        <h2 className="text-xl font-bold text-[#D4AF37]">Vacation Homes & Short-Stay BnBs</h2>
        <p className="text-xs text-gray-400 mt-1">Book premium serviced apartments and staycations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bnbs.map((item) => (
          <div key={item._id} className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden p-4 space-y-3">
            <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover rounded-xl" />
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                <p className="text-xs text-gray-400">📍 {item.location}</p>
              </div>
              <span className="text-md font-extrabold text-[#D4AF37]">
                KES {item.price.toLocaleString()} <span className="text-[10px] text-gray-500 font-normal">/ night</span>
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {item.amenities?.map((a, i) => (
                <span key={i} className="bg-[#1A1A1A] text-gray-300 text-[10px] px-2 py-0.5 rounded-md border border-gray-800">
                  ✓ {a}
                </span>
              ))}
            </div>
            <button className="w-full bg-[#D4AF37] text-black font-extrabold text-xs py-2.5 rounded-xl hover:bg-[#b5942f] transition cursor-pointer">
              Reserve Stay
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}