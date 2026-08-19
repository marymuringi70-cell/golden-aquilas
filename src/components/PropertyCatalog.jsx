import React, { useState } from 'react';

export default function PropertyCatalog({ onSelectProperty }) {
  const [filter, setFilter] = useState('ALL');

  const properties = [
    {
      id: 'PROP-01',
      title: 'The Obsidian Luxury Studio',
      type: 'BNB',
      location: 'Kilimani, Nairobi',
      price: 'Ksh 4,500 / night',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80',
      specs: ['1 Bedroom', 'Smart Access Keypad', '100Mbps Wi-Fi', 'Balcony View'],
      status: 'AVAILABLE'
    },
    {
      id: 'PROP-02',
      title: 'Qwetu Suburbia Residence',
      type: 'HOSTEL',
      location: 'Ruiru, Near Campus',
      price: 'Ksh 25,000 / semester',
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80',
      specs: ['Single Bedspace', 'Biometric Entry', 'Study Lounge', 'Ensuite Shower'],
      status: 'AVAILABLE'
    },
    {
      id: 'PROP-03',
      title: 'Golden Aquilas Penthouse Suite',
      type: 'BNB',
      location: 'Westlands, Nairobi',
      price: 'Ksh 8,000 / night',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
      specs: ['2 Bedrooms', 'Rooftop Pool', 'Secure Parking', 'Smart TV'],
      status: 'AVAILABLE'
    },
    {
      id: 'PROP-04',
      title: 'Campus Edge Student Units',
      type: 'HOSTEL',
      location: 'Juja, Kiambu',
      price: 'Ksh 18,000 / semester',
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80',
      specs: ['Shared 2-Bed Suite', '24/7 Security', 'Backup Generator', 'Laundry Area'],
      status: 'BOOKED'
    }
  ];

  const filteredProperties = properties.filter(item => {
    if (filter === 'BNB') return item.type === 'BNB';
    if (filter === 'HOSTEL') return item.type === 'HOSTEL';
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-wider text-[#D4AF37]">PROPERTY & SUITE CATALOG</h2>
          <p className="text-xs text-gray-400 uppercase mt-1">Explore short-stay BnBs & premium student residences</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          {['ALL', 'BNB', 'HOSTEL'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs font-mono font-bold uppercase px-4 py-2 rounded-lg transition border cursor-pointer ${
                filter === cat
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'bg-[#1A1A1A] text-gray-400 border-gray-800 hover:text-white'
              }`}
            >
              {cat === 'ALL' ? 'All Units' : cat === 'BNB' ? 'BnB Suites' : 'Student Hostels'}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProperties.map(prop => (
          <div key={prop.id} className="bg-[#1A1A1A] border border-gray-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#D4AF37]/50 transition group">
            <div>
              {/* Card Image Header */}
              <div className="relative h-48 bg-black overflow-hidden">
                <img 
                  src={prop.image} 
                  alt={prop.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className={`absolute top-3 right-3 text-[10px] font-mono font-bold px-2.5 py-1 rounded border uppercase ${
                  prop.status === 'AVAILABLE' ? 'bg-green-500/80 text-white border-green-400' : 'bg-red-500/80 text-white border-red-400'
                }`}>
                  {prop.status}
                </span>
                <span className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm text-[#D4AF37] font-mono text-[10px] font-bold px-2.5 py-1 rounded border border-[#D4AF37]/40">
                  {prop.type}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#D4AF37] transition">{prop.title}</h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                    📍 {prop.location}
                  </p>
                </div>

                {/* Spec Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {prop.specs.map((spec, i) => (
                    <span key={i} className="text-[10px] bg-[#0B0B0B] text-gray-300 border border-gray-800 px-2 py-0.5 rounded font-mono">
                      ✓ {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer / Action */}
            <div className="p-6 pt-0 border-t border-gray-800/50 mt-2 flex items-center justify-between">
              <div>
                <span className="block text-[9px] uppercase text-gray-500 font-bold tracking-wider">Rate</span>
                <span className="text-sm font-extrabold text-[#D4AF37] font-mono">{prop.price}</span>
              </div>

              <button
                disabled={prop.status === 'BOOKED'}
                onClick={() => onSelectProperty && onSelectProperty(prop)}
                className={`text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg transition cursor-pointer ${
                  prop.status === 'AVAILABLE'
                    ? 'bg-[#D4AF37] text-black hover:brightness-110'
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                {prop.status === 'AVAILABLE' ? 'Select & Reserve' : 'Occupied'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}