import React from 'react';

export default function LandlordLedger() {
  const propertiesOwned = [
    { name: "Apex Heights Apartments", units: 12, grossRent: "Ksh 540,000", managementFee: "Ksh 54,000", netPayout: "Ksh 486,000" },
    { name: "The Obsidian Luxury Suite", units: 1, grossRent: "Ksh 120,000", managementFee: "Ksh 12,000", netPayout: "Ksh 108,000" }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-wider text-[#D4AF37]">LANDLORD LEDGER & PAYOUTS</h2>
        <p className="text-xs text-gray-400 uppercase mt-1">Property Revenue Streams & Management Fee Statements</p>
      </div>

      {/* Top Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1A1A1A] border border-gray-800 p-5 rounded-xl">
          <span className="block text-[10px] uppercase text-gray-500 font-bold tracking-wider">Gross Monthly Collections</span>
          <span className="text-xl font-extrabold text-white mt-1 block">Ksh 660,000</span>
        </div>
        <div className="bg-[#1A1A1A] border border-gray-800 p-5 rounded-xl">
          <span className="block text-[10px] uppercase text-gray-500 font-bold tracking-wider">Agent Commission Retained (10%)</span>
          <span className="text-xl font-extrabold text-red-400 mt-1 block">- Ksh 66,000</span>
        </div>
        <div className="bg-[#1A1A1A] border border-[#D4AF37]/40 p-5 rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#221c0e]">
          <span className="block text-[10px] uppercase text-[#D4AF37] font-bold tracking-wider">Net Owner Remittance</span>
          <span className="text-xl font-extrabold text-[#D4AF37] mt-1 block">Ksh 594,000</span>
        </div>
      </div>

      {/* Property Breakdown Table */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
        <h3 className="font-bold text-lg text-white border-b border-gray-800 pb-4 mb-4">Property Performance & Deductions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-800 text-gray-500 uppercase tracking-wider font-bold">
                <th className="py-3 px-2">Property Name</th>
                <th className="py-3 px-2">Units</th>
                <th className="py-3 px-2">Gross Income</th>
                <th className="py-3 px-2">Platform Fee (10%)</th>
                <th className="py-3 px-2 text-right">Net Owner Payout</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/40">
              {propertiesOwned.map((prop, idx) => (
                <tr key={idx} className="hover:bg-[#0B0B0B]/50 transition">
                  <td className="py-3 px-2 font-bold text-white">{prop.name}</td>
                  <td className="py-3 px-2 text-gray-400">{prop.units} Units</td>
                  <td className="py-3 px-2 text-gray-300 font-mono">{prop.grossRent}</td>
                  <td className="py-3 px-2 text-red-400 font-mono">{prop.managementFee}</td>
                  <td className="py-3 px-2 text-right text-[#D4AF37] font-bold font-mono">{prop.netPayout}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}