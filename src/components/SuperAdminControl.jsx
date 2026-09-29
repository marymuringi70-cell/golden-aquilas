import React, { useState, useEffect } from 'react';

export default function SuperAdminControl({ user }) {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddListingModal, setShowAddListingModal] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Agent',
  });
  const [newListingData, setNewListingData] = useState({
    title: '',
    category: 'House',
    location: '',
    price: '',
    period: 'per month',
    amenities: '',
  });

  const fetchData = () => {
    fetch('http://localhost:5000/api/tickets')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setTickets(data);
      })
      .catch((err) => console.error('Error fetching tickets:', err));

    fetch('http://localhost:5000/api/users')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setUsers(data);
      })
      .catch((err) => console.error('Error fetching users:', err));

    fetch('http://localhost:5000/api/properties')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProperties(data);
      })
      .catch((err) => console.error('Error fetching properties:', err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update Ticket Status (Pending -> In Progress -> Resolved)
  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tickets/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const updated = await res.json();
        setTickets((prev) =>
          prev.map((t) => (t.id === id ? { ...t, status: updated.status } : t))
        );
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleAddUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUserData),
      });

      if (res.ok) {
        const data = await res.json();
        setUsers([data.user, ...users]);
        setShowAddUserModal(false);
        setNewUserData({ name: '', email: '', phone: '', role: 'Agent' });
      } else {
        const errData = await res.json();
        alert(errData.error || 'Failed to add user');
      }
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  const handleAddListingSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();
      payload.append('title', newListingData.title);
      payload.append('category', newListingData.category);
      payload.append('location', newListingData.location);
      payload.append('price', String(Number(newListingData.price)));
      payload.append('period', newListingData.period);
      payload.append('amenities', newListingData.amenities);
      if (photoFile) payload.append('photo', photoFile);

      const res = await fetch('http://localhost:5000/api/properties', {
        method: 'POST',
        body: payload,
      });

      if (res.ok) {
        setShowAddListingModal(false);
        setPhotoFile(null);
        setPhotoPreview('');
        setNewListingData({ title: '', category: 'House', location: '', price: '', period: 'per month', amenities: '' });
        fetchData();
      } else {
        const errData = await res.json();
        alert(errData.error || 'Failed to add property listing');
      }
    } catch (err) {
      console.error('Error adding property listing:', err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#111111] border border-gray-800 p-6 rounded-2xl gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#D4AF37] tracking-wide">
            Super Admin Control Center
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            System Overseer: {user?.name || 'Administrator'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowAddListingModal(true)}
            className="bg-[#D4AF37] hover:bg-[#b5942f] text-black font-extrabold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer shadow-lg shadow-[#D4AF37]/10"
          >
            + Publish House Hunt Listing
          </button>
          <button
            onClick={() => setShowAddUserModal(true)}
            className="bg-[#1A1A1A] text-white border border-gray-700 hover:border-[#D4AF37] font-extrabold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer"
          >
            + Add Agent / Landlord
          </button>
        </div>
      </div>

      {/* SECTION 1: System Users Management */}
      <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-md font-bold text-white flex items-center gap-2">
          <span>👥</span> Registered Management Accounts
        </h3>

        {users.length === 0 ? (
          <p className="text-xs text-gray-500 italic">No custom accounts added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400">
                  <th className="py-2.5 px-3">Name</th>
                  <th className="py-2.5 px-3">Email</th>
                  <th className="py-2.5 px-3">Phone</th>
                  <th className="py-2.5 px-3">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-[#1A1A1A] transition">
                    <td className="py-3 px-3 font-semibold text-white">{u.name}</td>
                    <td className="py-3 px-3 text-gray-400">{u.email}</td>
                    <td className="py-3 px-3 text-gray-400">{u.phone || 'N/A'}</td>
                    <td className="py-3 px-3">
                      <span className="bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold">
                        {u.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-md font-bold text-white flex items-center gap-2">
          <span>🏠</span> Available House Hunt Listings ({properties.length})
        </h3>

        {properties.length === 0 ? (
          <p className="text-xs text-gray-500 italic">No listings published for house hunting yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {properties.map((property) => (
              <div key={property._id || property.id} className="bg-[#0B0B0B] border border-gray-800 rounded-xl overflow-hidden">
                {property.imageUrl ? (
                  <img src={property.imageUrl} alt={property.title} className="w-full h-40 object-cover" />
                ) : (
                  <div className="w-full h-40 bg-[#1A1A1A] flex items-center justify-center text-[10px] uppercase tracking-[0.2em] text-gray-500">No Photo</div>
                )}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold">
                      {property.category}
                    </span>
                    <span className="text-[10px] text-green-400 bg-green-500/10 border border-green-500/30 px-2 py-0.5 rounded-full font-bold">
                      {property.status || 'AVAILABLE'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{property.title}</h4>
                  <p className="text-xs text-gray-400">📍 {property.location}</p>
                  <p className="text-sm font-extrabold text-[#D4AF37]">KES {Number(property.price || 0).toLocaleString()} / {property.period || 'month'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: Maintenance & Caretaker Ticket Pipeline */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-bold text-white flex items-center gap-2">
            <span>🔧</span> Live Maintenance Tickets ({tickets.length})
          </h3>
        </div>

        {tickets.length === 0 ? (
          <div className="bg-[#111111] border border-gray-800 p-8 rounded-2xl text-center text-xs text-gray-500">
            No maintenance tickets reported.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tickets.map((t) => (
              <div
                key={t._id || t.id}
                className="bg-[#111111] border border-gray-800 p-5 rounded-2xl space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#D4AF37]">
                        {t.id}
                      </span>
                      <h4 className="text-sm font-bold text-white">{t.category}</h4>
                      <p className="text-xs text-gray-400">
                        {t.property} • Unit: {t.unit}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${
                        t.status === 'Resolved'
                          ? 'bg-green-500/10 text-green-400 border-green-500/30'
                          : t.status === 'In Progress'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                          : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 bg-[#0A0A0A] p-3 rounded-xl border border-gray-800/60 leading-relaxed">
                    "{t.description}"
                  </p>

                  {t.photoUrl && (
                    <div className="mt-2">
                      <p className="text-[10px] font-mono text-gray-500 uppercase mb-1">
                        Attached Inspection Photo
                      </p>
                      <img
                        src={t.photoUrl}
                        alt="Issue Attachment"
                        className="w-full h-40 object-cover rounded-xl border border-gray-800"
                      />
                    </div>
                  )}
                </div>

                {/* Status Action Buttons */}
                <div className="flex gap-2 pt-2 border-t border-gray-800/60">
                  <button
                    onClick={() => handleStatusUpdate(t.id, 'In Progress')}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white text-[11px] py-1.5 rounded-lg font-semibold transition cursor-pointer"
                  >
                    Set In Progress
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(t.id, 'Resolved')}
                    className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/40 text-[11px] py-1.5 rounded-lg font-bold transition cursor-pointer"
                  >
                    Mark Resolved
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showAddListingModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#141414] border border-gray-800 p-6 rounded-2xl w-full max-w-md space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-[#D4AF37]">Publish House Hunt Listing</h3>

            <form onSubmit={handleAddListingSubmit} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Title"
                value={newListingData.title}
                onChange={(e) => setNewListingData({ ...newListingData, title: e.target.value })}
                className="w-full bg-[#0B0B0B] border border-gray-800 text-white rounded-xl p-2.5 text-xs focus:border-[#D4AF37] outline-none"
              />

              <div className="flex gap-2">
                <select
                  value={newListingData.category}
                  onChange={(e) => setNewListingData({ ...newListingData, category: e.target.value })}
                  className="w-1/2 bg-[#0B0B0B] border border-gray-800 text-white rounded-xl p-2.5 text-xs focus:border-[#D4AF37] outline-none"
                >
                  <option value="House">House</option>
                  <option value="Hostel">Hostel</option>
                  <option value="BnB">BnB</option>
                </select>
                <input
                  type="text"
                  required
                  placeholder="Location"
                  value={newListingData.location}
                  onChange={(e) => setNewListingData({ ...newListingData, location: e.target.value })}
                  className="w-1/2 bg-[#0B0B0B] border border-gray-800 text-white rounded-xl p-2.5 text-xs focus:border-[#D4AF37] outline-none"
                />
              </div>

              <div className="flex gap-2">
                <input
                  type="number"
                  required
                  placeholder="Price"
                  value={newListingData.price}
                  onChange={(e) => setNewListingData({ ...newListingData, price: e.target.value })}
                  className="w-1/2 bg-[#0B0B0B] border border-gray-800 text-white rounded-xl p-2.5 text-xs focus:border-[#D4AF37] outline-none"
                />
                <input
                  type="text"
                  value={newListingData.period}
                  onChange={(e) => setNewListingData({ ...newListingData, period: e.target.value })}
                  placeholder="Period"
                  className="w-1/2 bg-[#0B0B0B] border border-gray-800 text-white rounded-xl p-2.5 text-xs focus:border-[#D4AF37] outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] text-gray-400 uppercase font-mono mb-1">Upload listing photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setPhotoFile(file);
                    setPhotoPreview(file ? URL.createObjectURL(file) : '');
                  }}
                  className="w-full bg-[#0B0B0B] border border-gray-800 text-white rounded-xl p-2 text-xs file:mr-3 file:rounded-md file:border-0 file:bg-[#D4AF37] file:text-black file:font-bold file:px-2 file:py-1"
                />
                {photoPreview && (
                  <img src={photoPreview} alt="Listing preview" className="w-full h-28 object-cover rounded-lg border border-gray-800" />
                )}
              </div>

              <input
                type="text"
                placeholder="Amenities (comma-separated)"
                value={newListingData.amenities}
                onChange={(e) => setNewListingData({ ...newListingData, amenities: e.target.value })}
                className="w-full bg-[#0B0B0B] border border-gray-800 text-white rounded-xl p-2.5 text-xs focus:border-[#D4AF37] outline-none"
              />

              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowAddListingModal(false)} className="w-1/2 bg-gray-800 text-gray-300 py-2 rounded-lg text-xs font-bold">Cancel</button>
                <button type="submit" className="w-1/2 bg-[#D4AF37] text-black py-2 rounded-lg text-xs font-extrabold">Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add User Modal Dialog */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#141414] border border-gray-800 p-6 rounded-2xl w-full max-w-md space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-[#D4AF37]">
              Register System Account
            </h3>

            <form onSubmit={handleAddUserSubmit} className="space-y-3">
              <div>
                <label className="block text-[10px] text-gray-400 uppercase font-mono mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newUserData.name}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, name: e.target.value })
                  }
                  className="w-full bg-[#0B0B0B] border border-gray-800 text-white rounded-xl p-2.5 text-xs focus:border-[#D4AF37] outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-gray-400 uppercase font-mono mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={newUserData.email}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, email: e.target.value })
                  }
                  className="w-full bg-[#0B0B0B] border border-gray-800 text-white rounded-xl p-2.5 text-xs focus:border-[#D4AF37] outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-gray-400 uppercase font-mono mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={newUserData.phone}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, phone: e.target.value })
                  }
                  className="w-full bg-[#0B0B0B] border border-gray-800 text-white rounded-xl p-2.5 text-xs focus:border-[#D4AF37] outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-gray-400 uppercase font-mono mb-1">
                  System Role
                </label>
                <select
                  value={newUserData.role}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, role: e.target.value })
                  }
                  className="w-full bg-[#0B0B0B] border border-gray-800 text-white rounded-xl p-2.5 text-xs focus:border-[#D4AF37] outline-none"
                >
                  <option value="Agent">Agent</option>
                  <option value="Landlord">Landlord</option>
                  <option value="Tenant">Tenant</option>
                  <option value="Hostel Admin">Hostel Admin</option>
                  <option value="Caretaker">Caretaker</option>
                </select>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="w-1/2 bg-gray-800 hover:bg-gray-700 text-gray-300 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-[#D4AF37] hover:bg-[#b5942f] text-black py-2.5 rounded-xl text-xs font-extrabold transition cursor-pointer"
                >
                  Save Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}