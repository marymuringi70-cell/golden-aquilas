import React, { useEffect, useState } from 'react';

export default function PropertyCatalog({ onSelectProperty }) {
  const [filter, setFilter] = useState('ALL');
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/properties')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProperties(data);
        }
      })
      .catch((err) => console.error('Error fetching property listings:', err));
  }, []);

  const normalizedProperties = properties.map((item) => ({
    id: item._id || item.id,
    title: item.title,
    type: (item.category || item.type || 'HOUSE').toUpperCase(),
    location: item.location,
    price: `Ksh ${Number(item.price || 0).toLocaleString()} / ${item.period || 'month'}`,
    image: item.imageUrl || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80',
    specs: Array.isArray(item.amenities) && item.amenities.length ? item.amenities : ['Verified Listing', 'Available Now'],
    status: item.status || 'AVAILABLE'
  }));

  const filteredProperties = normalizedProperties.filter((item) => {
    if (filter === 'BNB') return item.type === 'BNB';
    if (filter === 'HOSTEL') return item.type === 'HOSTEL';
    if (filter === 'HOUSE') return item.type === 'HOUSE';
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-wider text-[#D4AF37]">PROPERTY & SUITE CATALOG</h2>
          <p className="text-xs text-gray-400 uppercase mt-1">Explore verified houses, hostels, and short-stay BnBs</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {['ALL', 'HOUSE', 'BNB', 'HOSTEL'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs font-mono font-bold uppercase px-4 py-2 rounded-lg transition border cursor-pointer ${
                filter === cat
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'bg-[#1A1A1A] text-gray-400 border-gray-800 hover:text-white'
              }`}
            >
              {cat === 'ALL' ? 'All Units' : cat === 'HOUSE' ? 'Houses' : cat === 'BNB' ? 'BnB Suites' : 'Student Hostels'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProperties.map((prop) => (
          <div key={prop.id} className="bg-[#1A1A1A] border border-gray-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#D4AF37]/50 transition group">
            <div>
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

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#D4AF37] transition">{prop.title}</h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">📍 {prop.location}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {prop.specs.map((spec, i) => (
                    <span key={`${prop.id}-${spec}-${i}`} className="text-[10px] bg-[#0B0B0B] text-gray-300 border border-gray-800 px-2 py-0.5 rounded font-mono">
                      ✓ {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

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