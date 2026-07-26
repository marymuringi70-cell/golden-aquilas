import React, { useState } from 'react';

// Mock data of local properties to display in our frontend grid
const MOCK_PROPERTIES = [
  {
    id: 'prop-1',
    name: "Apex Heights Apartments",
    type: "RESIDENTIAL",
    location: "Kilimani, Nairobi",
    price: "Ksh 55,000 / month",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&auto=format&fit=crop&q=60",
    size: "85 sqm",
    amenities: ["High-speed Lift", "Borehole", "24/7 Security"]
  },
  {
    id: 'prop-2',
    name: "Qwetu Suburbia Hostels",
    type: "HOSTEL",
    location: "Near Juja / JKUAT",
    price: "Ksh 12,500 / semester",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&auto=format&fit=crop&q=60",
    size: "Per-Bed Share",
    amenities: ["Free Wi-Fi", "Study Lounge", "Biometric Access"]
  },
  {
    id: 'prop-3',
    name: "The Obsidian Luxury Suite",
    type: "BNB",
    location: "Westlands, Nairobi",
    price: "Ksh 8,500 / night",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&auto=format&fit=crop&q=60",
    size: "45 sqm",
    amenities: ["Smart Lock", "Infinity Pool", "Netflix / Prime"]
  }
];

function HouseHuntingScreen({ user, onBackToLogin }) {
  const [filterType, setFilterType] = useState('ALL');
  const [selectedProperty, setSelectedProperty] = useState(null);

  const filteredProperties = filterType === 'ALL' 
    ? MOCK_PROPERTIES 
    : MOCK_PROPERTIES.filter(p => p.type === filterType);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#E0E0E0] p-6">
      {/* Header Layer */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-6 mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-wider text-[#D4AF37]">DISCOVER SPACES</h1>
          <p className="text-xs text-gray-400 uppercase mt-1">Premium verified listings across Kenya</p>
        </div>
        
        {/* If user is a public guest, show back to login button */}
        {!user && (
          <button 
            onClick={onBackToLogin}
            className="text-xs font-bold border border-[#D4AF37]/50 text-[#D4AF37] px-4 py-2 rounded-lg hover:bg-[#D4AF37] hover:text-black transition cursor-pointer"
          >
            ← Port Back to Login Access
          </button>
        )}
      </div>

      {/* Main Split Layout: Left side Grid, Right side Details Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* PROPERTIES COLUMN GRID */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Segment Filter Bar */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {['ALL', 'RESIDENTIAL', 'HOSTEL', 'BNB'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`text-xs px-4 py-2 rounded-lg font-bold tracking-wider transition cursor-pointer whitespace-nowrap ${
                  filterType === type 
                    ? 'bg-[#D4AF37] text-black shadow-lg' 
                    : 'bg-[#1A1A1A] text-gray-400 border border-gray-800 hover:border-[#D4AF37]/40'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProperties.map((property) => (
              <div 
                key={property.id}
                onClick={() => setSelectedProperty(property)}
                className={`bg-[#1A1A1A] border rounded-xl overflow-hidden shadow-xl transition cursor-pointer transform hover:-translate-y-1 ${
                  selectedProperty?.id === property.id ? 'border-[#D4AF37]' : 'border-gray-800'
                }`}
              >
                <div className="h-48 relative bg-gray-900">
                  <img src={property.image} alt={property.name} className="w-full h-full object-cover brightness-90" />
                  <span className="absolute top-3 right-3 text-[10px] bg-black/80 text-[#D4AF37] border border-[#D4AF37]/40 px-2 py-1 rounded font-mono font-bold tracking-wider">
                    {property.type}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-white truncate">{property.name}</h3>
                  <p className="text-xs text-gray-400 flex items-center mt-1">📍 {property.location}</p>
                  <div className="mt-4 flex justify-between items-center pt-3 border-t border-gray-800/60">
                    <span className="text-xs text-gray-400">{property.size}</span>
                    <span className="text-sm font-bold text-[#D4AF37]">{property.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DETAILS & ACTION SIDE PANEL */}
        <div className="lg:col-span-1">
          {selectedProperty ? (
            <div className="bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl p-6 sticky top-6 shadow-2xl animate-fadeIn">
              <h2 className="text-xl font-extrabold text-[#D4AF37] tracking-wide mb-2">{selectedProperty.name}</h2>
              <p className="text-sm text-gray-400 mb-4">📍 {selectedProperty.location}</p>
              
              <div className="space-y-4 my-6">
                <div>
                  <span className="block text-[10px] uppercase text-gray-500 font-bold tracking-widest">Rate Listing</span>
                  <span className="text-lg font-bold text-white">{selectedProperty.price}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-2">Amenities Included</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProperty.amenities.map((amenity, idx) => (
                      <span key={idx} className="text-xs bg-[#0B0B0B] border border-gray-800 text-gray-300 px-2.5 py-1 rounded">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Operations Action Panel CTA */}
              <div className="pt-4 border-t border-gray-800 space-y-3">
                <button 
                  onClick={() => alert(`Viewing inquiry routed to agent for ${selectedProperty.name}`)}
                  className="w-full bg-[#D4AF37] text-black font-bold uppercase tracking-wider text-xs py-3 rounded-lg hover:brightness-110 transition cursor-pointer"
                >
                  Schedule Viewing Appointment
                </button>
                <button 
                  onClick={() => alert(`Application pipeline initiated for ${selectedProperty.name}`)}
                  className="w-full bg-[#0B0B0B] text-white border border-gray-700 font-bold uppercase tracking-wider text-xs py-3 rounded-lg hover:border-[#D4AF37] transition cursor-pointer"
                >
                  Apply For Unit / Book Unit
                </button>
              </div>
            </div>
          ) : (
            <div className="h-64 bg-[#1A1A1A]/40 border border-dashed border-gray-800 rounded-xl flex flex-col items-center justify-center p-6 text-center sticky top-6">
              <span className="text-3xl mb-2">👁️</span>
              <p className="text-sm text-gray-500 font-medium">Select any property listing artifact on the left card grid layout to trigger deep metrics and booking actions.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default HouseHuntingScreen;