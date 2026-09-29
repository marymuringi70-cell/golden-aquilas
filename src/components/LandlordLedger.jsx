import React, { useState, useEffect } from 'react';

export default function LandlordLedger() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/properties')
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setProperties(data))
      .catch((err) => console.error(err));
  }, []);

  const totalMonthlyIncome = properties.reduce((acc, item) => acc + (item.price || 0), 0);

  return (
    <div className="space-y-6">
      <div className="bg-[#111] p-6 rounded-2xl border border-gray-800 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-[#D4AF37]">Landlord Financial Ledger</h2>
          <p className="text-xs text-gray-400 mt-1">Portfolio revenue statement and property performance</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-gray-400 uppercase block font-mono">Gross Estimated Yield</span>
          <span className="text-lg font-extrabold text-[#D4AF37]">KES {totalMonthlyIncome.toLocaleString()}</span>
        </div>
      </div>

      <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-md font-bold text-white">Portfolio Holdings ({properties.length})</h3>
        <div className="space-y-3">
          {properties.map((p) => (
            <div key={p._id} className="bg-[#1A1A1A] p-4 rounded-xl border border-gray-800 flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold text-white">{p.title}</h4>
                <p className="text-[10px] text-gray-400">📍 {p.location} • <span className="text-[#D4AF37]">{p.category}</span></p>
              </div>
              <div className="text-right">
                <span className="text-xs font-extrabold text-[#D4AF37] block">KES {p.price.toLocaleString()}</span>
                <span className="text-[9px] text-gray-500 font-mono">{p.period}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}