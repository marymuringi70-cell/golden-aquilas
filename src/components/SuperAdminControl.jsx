import React, { useState } from 'react';

export default function SuperAdminControl({ user }) {
  // Sample state for incoming repair tickets across BnB and Student units
  const [tickets, setTickets] = useState([
    {
      id: "TICK-801",
      property: "The Obsidian Luxury Studio (BnB)",
      unit: "Kilimani #204",
      guest: "John Doe",
      category: "Plumbing",
      description: "Hot shower tap is leaking continuously onto the floor.",
      photo: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80",
      status: "Pending",
      timestamp: "Today, 18:40"
    },
    {
      id: "TICK-802",
      property: "Qwetu Suburbia Residence",
      unit: "Block B — Room 204",
      guest: "Alex Mwangi",
      category: "Electrical",
      description: "Study desk power socket shorted and smells scorched.",
      photo: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=400&q=80",
      status: "In Progress",
      timestamp: "Today, 14:15"
    }
  ]);

  const [filter, setFilter] = useState("ALL");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Status Change Handler
  const handleStatusChange = (id, newStatus) => {
    setTickets(prev =>
      prev.map(ticket => (ticket.id === id ? { ...ticket, status: newStatus } : ticket))
    );
  };

  const filteredTickets = tickets.filter(t => {
    if (filter === "PENDING") return t.status === "Pending";
    if (filter === "IN_PROGRESS") return t.status === "In Progress";
    if (filter === "RESOLVED") return t.status === "Resolved";
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-800 pb-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-wider text-[#D4AF37]">SUPER ADMIN COMMAND</h2>
          <p className="text-xs text-gray-400 uppercase mt-1">Incident Dispatch & Property Maintenance Oversight</p>
        </div>
        <div className="flex gap-2">
          <span className="text-xs font-mono bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded-full font-bold">
            {tickets.filter(t => t.status === "Pending").length} Pending Repairs
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-3">
        {["ALL", "PENDING", "IN_PROGRESS", "RESOLVED"].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`text-xs font-mono font-bold uppercase px-4 py-2 rounded-lg transition border cursor-pointer ${
              filter === tab
                ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                : "bg-[#1A1A1A] text-gray-400 border-gray-800 hover:text-white"
            }`}
          >
            {tab.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Incident Tickets List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTickets.map(ticket => (
          <div key={ticket.id} className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              {/* Top Meta */}
              <div className="flex justify-between items-start border-b border-gray-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-[#D4AF37] font-bold block">{ticket.id}</span>
                  <h3 className="font-bold text-white text-base">{ticket.property}</h3>
                  <p className="text-xs text-gray-400">{ticket.unit} • <span className="text-gray-300 font-medium">{ticket.guest}</span></p>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded border uppercase ${
                  ticket.status === "Pending" ? "bg-red-500/10 text-red-400 border-red-500/30" :
                  ticket.status === "In Progress" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30" :
                  "bg-green-500/10 text-green-400 border-green-500/30"
                }`}>
                  {ticket.status}
                </span>
              </div>

              {/* Issue Details & Photo */}
              <div className="flex gap-4 items-start">
                {ticket.photo && (
                  <div 
                    onClick={() => setSelectedPhoto(ticket.photo)}
                    className="w-20 h-20 shrink-0 bg-black rounded-lg border border-gray-800 overflow-hidden cursor-pointer hover:border-[#D4AF37] transition group relative"
                  >
                    <img src={ticket.photo} alt="Reported issue" className="w-full h-full object-cover group-hover:scale-105 transition" />
                    <span className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 text-[10px] text-white font-bold">
                      View
                    </span>
                  </div>
                )}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">Category: {ticket.category}</span>
                  <p className="text-xs text-gray-300 leading-relaxed">{ticket.description}</p>
                  <span className="text-[9px] text-gray-500 font-mono block pt-1">Reported: {ticket.timestamp}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t border-gray-800 pt-3 flex gap-2">
              <button
                onClick={() => handleStatusChange(ticket.id, "In Progress")}
                className="flex-1 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 font-bold text-[10px] uppercase py-2 rounded-lg transition cursor-pointer"
              >
                Assign Technician
              </button>
              <button
                onClick={() => handleStatusChange(ticket.id, "Resolved")}
                className="flex-1 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 font-bold text-[10px] uppercase py-2 rounded-lg transition cursor-pointer"
              >
                Mark Resolved
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for full photo inspection */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-lg w-full bg-[#1A1A1A] border border-[#D4AF37] p-2 rounded-xl">
            <img src={selectedPhoto} alt="Full resolution detail" className="w-full h-auto rounded-lg" />
            <p className="text-center text-xs text-gray-400 mt-2 font-mono">Click anywhere to close full view</p>
          </div>
        </div>
      )}
    </div>
  );
}