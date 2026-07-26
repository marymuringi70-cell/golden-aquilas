import React, { useState } from 'react';

export default function AgentDashboard() {
  // Mock statistics for the top KPI row
  const stats = [
    { label: "Total Managed Units", value: "24", icon: "🏢" },
    { label: "Occupancy Rate", value: "88%", icon: "📊" },
    { label: "Collected This Month", value: "Ksh 312,000", icon: "💰" },
    { label: "Open Maintenance Tickets", value: "3", icon: "🔧" }
  ];

  // Mock data for the critical M-Pesa automated reconciliation tab
  const mockPayments = [
    { id: "TXN-982", tenant: "Mercy Wanjiku", unit: "Apt 4B", amount: "Ksh 45,000", status: "AUTO-MATCHED", reference: "SRE76HJD92" },
    { id: "TXN-983", tenant: "John Kamau", unit: "Room 12 (Bed A)", amount: "Ksh 12,500", status: "AUTO-MATCHED", reference: "SRE12PLK84" },
    { id: "TXN-984", tenant: "Unknown Payer", unit: "Unassigned", amount: "Ksh 8,500", status: "PENDING REVIEW", reference: "SRE99MNO11" }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Heading Banner */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-wider text-[#D4AF37]">AGENT COMMAND CENTER</h2>
        <p className="text-xs text-gray-400 uppercase mt-1">Operational Command & M-Pesa Ledger Stream</p>
      </div>

      {/* 1. TOP KPI METRICS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-[#1A1A1A] border border-gray-800 p-5 rounded-xl flex items-center justify-between">
            <div>
              <span className="block text-[10px] uppercase text-gray-500 font-bold tracking-wider">{stat.label}</span>
              <span className="text-xl font-extrabold text-white mt-1 block">{stat.value}</span>
            </div>
            <span className="text-2xl bg-[#0B0B0B] p-2.5 rounded-lg border border-gray-800/80">{stat.icon}</span>
          </div>
        ))}
      </div>

      {/* 2. CORE WORKSPACE SPLIT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT TWO COLUMNS: M-PESA RECONCILIATION ENGINE */}
        <div className="lg:col-span-2 bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center border-b border-gray-800 pb-4 mb-4">
            <div>
              <h3 className="font-bold text-lg text-white tracking-wide">Live M-Pesa Reconciliation Engine</h3>
              <p className="text-xs text-gray-500">Automated ledger parsing matching push callbacks to tenant cards</p>
            </div>
            <button className="text-[11px] bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1.5 rounded font-bold hover:bg-[#D4AF37] hover:text-black transition cursor-pointer">
              Fetch Live Statement
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-800 text-gray-500 uppercase tracking-wider font-bold">
                  <th className="py-3 px-2">M-Pesa Ref</th>
                  <th className="py-3 px-2">User / Target</th>
                  <th className="py-3 px-2">Amount</th>
                  <th className="py-3 px-2 text-right">Status State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/40">
                {mockPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-[#0B0B0B]/50 transition">
                    <td className="py-3 px-2 font-mono text-white font-semibold">{p.reference}</td>
                    <td className="py-3 px-2">
                      <span className="block font-medium text-gray-300">{p.tenant}</span>
                      <span className="text-[10px] text-gray-500">{p.unit}</span>
                    </td>
                    <td className="py-3 px-2 text-[#D4AF37] font-bold">{p.amount}</td>
                    <td className="py-3 px-2 text-right">
                      <span className={`inline-block text-[9px] font-extrabold tracking-wider px-2 py-0.5 rounded border uppercase ${
                        p.status === 'AUTO-MATCHED' 
                          ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                          : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20 animate-pulse'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: QUICK INVENTORY ACTION CENTER */}
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg text-white tracking-wide border-b border-gray-800 pb-4 mb-4">Inventory Engine</h3>
            <p className="text-xs text-gray-400 mb-6">Onboard landlords and list new units instantly to scale properties organically.</p>
            
            <div className="space-y-3">
              <button onClick={() => alert("Open modal: Form fields to Register New Landlord profile")} className="w-full bg-[#0B0B0B] border border-gray-800 text-left hover:border-[#D4AF37]/50 p-3 rounded-lg flex items-center space-x-3 transition cursor-pointer group">
                <span className="text-lg bg-[#1A1A1A] p-2 rounded border border-gray-800 group-hover:text-[#D4AF37]">➕</span>
                <div>
                  <span className="block text-xs font-bold text-white">Onboard Private Landlord</span>
                  <span className="block text-[10px] text-gray-500">Link landlord profile for reporting payouts</span>
                </div>
              </button>

              <button onClick={() => alert("Open modal: Configuration to Add Blocks/Rooms/Beds")} className="w-full bg-[#0B0B0B] border border-gray-800 text-left hover:border-[#D4AF37]/50 p-3 rounded-lg flex items-center space-x-3 transition cursor-pointer group">
                <span className="text-lg bg-[#1A1A1A] p-2 rounded border border-gray-800 group-hover:text-[#D4AF37]">🏢</span>
                <div>
                  <span className="block text-xs font-bold text-white">Register Complex / Hostel</span>
                  <span className="block text-[10px] text-gray-500">Configure room schemas and per-bed parameters</span>
                </div>
              </button>
            </div>
          </div>

          <div className="mt-8 bg-[#0B0B0B] border border-dashed border-gray-800 p-4 rounded-xl text-center">
            <span className="text-xs text-gray-500 block font-medium">Automatic system cut calculation:</span>
            <span className="text-lg font-black text-[#D4AF37] block mt-1">10% Platform Retained</span>
          </div>
        </div>

      </div>
    </div>
  );
}