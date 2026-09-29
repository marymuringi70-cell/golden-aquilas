import React, { useState, useEffect } from 'react';

export default function AgentDashboard() {
  const [properties, setProperties] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    category: 'House',
    location: '',
    price: '',
    period: 'per month',
    amenities: ''
  });

  const fetchProperties = () => {
    fetch('http://localhost:5000/api/properties')
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setProperties(data))
      .catch((err) => console.error('Error fetching properties:', err));
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleCreateProperty = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('category', formData.category);
      payload.append('location', formData.location);
      payload.append('price', String(Number(formData.price)));
      payload.append('period', formData.period);
      payload.append('amenities', formData.amenities);

      if (photoFile) {
        payload.append('photo', photoFile);
      }

      const res = await fetch('http://localhost:5000/api/properties', {
        method: 'POST',
        body: payload
      });

      if (res.ok) {
        setShowAddModal(false);
        setPhotoFile(null);
        setPhotoPreview('');
        setFormData({ title: '', category: 'House', location: '', price: '', period: 'per month', amenities: '' });
        fetchProperties();
      }
    } catch (err) {
      console.error('Error creating property:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-[#111] border border-gray-800 p-6 rounded-2xl">
        <div>
          <h2 className="text-xl font-bold text-[#D4AF37]">Agent Portal & Property Management</h2>
          <p className="text-xs text-gray-400 mt-1">Manage listings and broadcast new vacancies</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#D4AF37] hover:bg-[#b5942f] text-black font-extrabold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer"
        >
          + Add New Listing
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.map((p) => (
          <div key={p._id} className="bg-[#111] border border-gray-800 p-4 rounded-2xl space-y-3 flex flex-col justify-between">
            {p.imageUrl ? (
              <img src={p.imageUrl} alt={p.title} className="w-full h-36 object-cover rounded-xl border border-gray-800" />
            ) : (
              <div className="w-full h-36 rounded-xl border border-dashed border-gray-700 bg-[#0b0b0b] flex items-center justify-center text-[10px] uppercase tracking-[0.2em] text-gray-500">
                No photo uploaded
              </div>
            )}
            <div className="space-y-1">
              <span className="bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] px-2 py-0.5 rounded font-mono font-bold">{p.category}</span>
              <h3 className="text-sm font-bold text-white mt-1">{p.title}</h3>
              <p className="text-xs text-gray-400">📍 {p.location}</p>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-800">
              <span className="text-sm font-extrabold text-[#D4AF37]">KES {Number(p.price || 0).toLocaleString()}</span>
              <span className="text-[10px] text-green-400 bg-green-500/10 border border-green-500/30 px-2 py-0.5 rounded-full font-bold">Active</span>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1A1A1A] border border-gray-800 p-6 rounded-2xl w-full max-w-md space-y-4">
            <h3 className="text-lg font-bold text-[#D4AF37]">Create Property Listing</h3>
            <form onSubmit={handleCreateProperty} className="space-y-3">
              <input type="text" placeholder="Title" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full bg-[#0B0B0B] border border-gray-800 text-white rounded-lg p-2 text-xs" />
              <div className="flex gap-2">
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-1/2 bg-[#0B0B0B] border border-gray-800 text-white rounded-lg p-2 text-xs">
                  <option value="House">House</option>
                  <option value="Hostel">Hostel</option>
                  <option value="BnB">BnB</option>
                </select>
                <input type="text" placeholder="Location" required value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-1/2 bg-[#0B0B0B] border border-gray-800 text-white rounded-lg p-2 text-xs" />
              </div>
              <div className="flex gap-2">
                <input type="number" placeholder="Price (KES)" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-1/2 bg-[#0B0B0B] border border-gray-800 text-white rounded-lg p-2 text-xs" />
                <input type="text" placeholder="Period (e.g. per month)" value={formData.period} onChange={(e) => setFormData({ ...formData, period: e.target.value })} className="w-1/2 bg-[#0B0B0B] border border-gray-800 text-white rounded-lg p-2 text-xs" />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400">Upload property photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setPhotoFile(file);
                    setPhotoPreview(file ? URL.createObjectURL(file) : '');
                  }}
                  className="w-full bg-[#0B0B0B] border border-gray-800 text-white rounded-lg p-2 text-xs file:mr-3 file:rounded-md file:border-0 file:bg-[#D4AF37] file:text-black file:font-bold file:px-2 file:py-1"
                />
                {photoPreview && (
                  <img src={photoPreview} alt="Property preview" className="w-full h-28 object-cover rounded-lg border border-gray-800" />
                )}
              </div>
              <input type="text" placeholder="Amenities (comma-separated)" value={formData.amenities} onChange={(e) => setFormData({ ...formData, amenities: e.target.value })} className="w-full bg-[#0B0B0B] border border-gray-800 text-white rounded-lg p-2 text-xs" />
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="w-1/2 bg-gray-800 text-gray-300 py-2 rounded-lg text-xs font-bold">Cancel</button>
                <button type="submit" className="w-1/2 bg-[#D4AF37] text-black py-2 rounded-lg text-xs font-extrabold">Publish Listing</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}