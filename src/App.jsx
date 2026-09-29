import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import SuperAdminControl from './components/SuperAdminControl';
import StudentHostelSuite from './components/StudentHostelSuite';
import BnbGuestHub from './components/BnbGuestHub';
import PropertyCatalog from './components/PropertyCatalog';
import TenantPortal from './components/TenantPortal';
import LandlordLedger from './components/LandlordLedger';
import AgentDashboard from './components/AgentDashboard';
import HouseHuntingScreen from './components/HouseHuntingScreen';

export default function App() {
  const [activeView, setActiveView] = useState('login');
  const [unreadMessages, setUnreadMessages] = useState(3);

  const overviewStats = [
    { label: 'Properties managed', value: '1,200+' },
    { label: 'Agents onboarded', value: '84' },
    { label: 'Monthly collections', value: 'KES 28.4M' },
    { label: 'IoT-enabled units', value: '320' },
  ];

  const roleCards = [
    {
      title: 'Super Admin',
      description: 'Owns the platform, controls subscriptions, pricing, revenue dashboards, and compliance systems.',
    },
    {
      title: 'Agent / Property Manager',
      description: 'Manages listings, approvals, maintenance, M-Pesa reconciliation, and agent commissions.',
    },
    {
      title: 'Landlord',
      description: 'Tracks income, vacancies, arrears, occupancy, and downloadable statements for owned properties.',
    },
    {
      title: 'Tenant',
      description: 'Pays rent, downloads receipts, tracks lease status, and submits maintenance requests.',
    },
    {
      title: 'Student',
      description: 'Handles hostel beds, semester billing, fee balances, maintenance, and room-related requests.',
    },
    {
      title: 'Guest',
      description: 'Browses vacation homes, books dates, pays deposits, and receives booking confirmations.',
    },
  ];

  const pitchSections = [
    {
      title: 'What Golden Aquilas is',
      type: 'paragraph',
      content:
        'Golden Aquilas is a full-stack operating system for real estate agents and property managers that manages house hunting, leasing, payments, hostels, BnB, maintenance, messaging, accounting, and IoT-enabled properties in one secure platform. It is not a listing site. It is a management and control system.',
    },
    {
      title: 'Built for',
      type: 'list',
      items: ['Rental properties', 'Hostels (per-bed & per-semester)', 'BnB & vacation homes', 'Agents, landlords, tenants, students, guests'],
    },
    {
      title: 'Property types managed',
      type: 'list',
      items: ['Residential rentals', 'Student hostels', 'BnB units', 'Vacation homes', 'Mixed-use properties'],
    },
    {
      title: 'Core operation flow',
      type: 'ordered',
      items: [
        'Properties are registered',
        'Units and beds are created',
        'Listings go live',
        'Users apply or book',
        'Payments are made',
        'Transactions reconcile automatically',
        'Access is granted and tracked',
        'Maintenance is logged',
        'Reports and statements are generated',
      ],
    },
    {
      title: 'Payment engine',
      type: 'paragraph',
      content:
        'Golden Aquilas supports rent, hostel fees, deposits, booking fees, and maintenance charges through M-Pesa STK Push. The system auto-matches payments to unit, user, invoice, and period, then issues receipts and statements instantly.',
    },
    {
      title: 'Maintenance & communication',
      type: 'list',
      items: [
        'Tenant or student submits a request',
        'Agent assigns a technician',
        'Status is tracked until closure',
        'Costs reflect in landlord statements',
        'Messages and updates remain auditable',
      ],
    },
    {
      title: 'IoT readiness',
      type: 'list',
      items: [
        'Smart locks for BnB and hostels',
        'Utility monitoring for power and water',
        'Auto-generated maintenance tickets',
        'Occupancy monitoring and vacancy detection',
        'Energy-saving environmental controls',
      ],
    },
    {
      title: 'Revenue model',
      type: 'list',
      items: [
        'Agent monthly SaaS subscriptions',
        'Transaction fees on rent and bookings',
        'Booking commissions for vacation stays',
        'Premium reporting and API access',
        'IoT add-on services and monitoring',
      ],
    },
    {
      title: 'Security & policy alignment',
      type: 'paragraph',
      content:
        'The platform uses role-based access control, encrypted payment flows, audit-friendly logs, and privacy-aware operational controls designed to align with Kenyan data protection expectations and mobile-money standards.',
    },
    {
      title: 'Final summary',
      type: 'paragraph',
      content:
        'Golden Aquilas is a rules-driven, payment-verified, role-controlled property operating system that centralizes properties, money, people, documents, communication, and physical infrastructure in one platform.',
    },
  ];

  // Navigation Links matching your mockup layout
  const navItems = [
    { id: 'login', label: 'Login' },
    { id: 'pitch', label: 'Overview' },
    { id: 'admin', label: 'Admin' },
    { id: 'agent', label: 'Agent' },
    { id: 'landlord', label: 'Landlord' },
    { id: 'tenant', label: 'Tenant' },
    { id: 'student', label: 'Student' },
    { id: 'bnb', label: 'Vacation Homes & BnBs' },
    { id: 'house_hunting', label: 'House Hunting' },
    { id: 'hostel_hunting', label: 'Hostel Hunting' },
    { id: 'hostel_admin', label: 'Hostel Admin' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'payments', label: 'Payments' },
    { id: 'messages', label: 'Messages', badge: unreadMessages },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-white p-4 sm:p-6 font-sans">
      {/* Header Logo Brand */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-[#D4AF37]/20 border border-[#D4AF37] rounded-lg flex items-center justify-center font-bold text-[#D4AF37] text-xl">
          🦅
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-[#D4AF37] tracking-wider leading-none">
            Golden Aquilas
          </h1>
          <p className="text-[10px] text-gray-500 font-mono mt-1">Property Management & Real Estate Operating System</p>
        </div>
      </div>

      {/* Top Navigation Pill Bar */}
      <div className="flex flex-wrap gap-2 mb-8 bg-[#111111] p-3 rounded-2xl border border-gray-800/80 shadow-2xl">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`text-xs font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 border ${
              activeView === item.id
                ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 font-bold'
                : 'bg-[#1A1A1A] text-gray-300 border-gray-800 hover:text-white hover:border-gray-700'
            }`}
          >
            {item.label}
            {item.badge && (
              <span className="bg-[#D4AF37] text-black text-[10px] font-extrabold px-1.5 py-0.2 rounded-full font-mono">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Dynamic View Switcher */}
      <main className="max-w-6xl mx-auto">
        {activeView === 'login' && <LoginScreen onLogin={() => setActiveView('student')} />}
        {activeView === 'admin' && <SuperAdminControl user={{ name: 'Super Admin' }} />}
        {activeView === 'hostel_admin' && <SuperAdminControl user={{ name: 'Hostel Admin' }} />}
        {activeView === 'student' && <StudentHostelSuite user={{ name: 'Mary Muringi' }} />}
        {activeView === 'bnb' && <BnbGuestHub user={{ name: 'Guest User' }} />}
        {(activeView === 'house_hunting' || activeView === 'hostel_hunting') && <PropertyCatalog />}
        {activeView === 'tenant' && <TenantPortal />}
        {activeView === 'landlord' && <LandlordLedger />}
        {activeView === 'agent' && <AgentDashboard />}
        {activeView === 'pitch' && (
          <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-8">
            <div className="text-center space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]">Platform overview</p>
              <h2 className="text-3xl sm:text-5xl font-black text-white">Golden Aquilas</h2>
              <p className="text-sm text-gray-300 max-w-4xl mx-auto leading-7">
                Golden Aquilas is a full-stack operating system for real estate agents and property managers that manages
                house hunting, leasing, payments, hostels, BnB, maintenance, messaging, accounting, and IoT-enabled
                properties in one secure platform.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {overviewStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-[#D4AF37]/30 bg-[#0d0d0d] p-5">
                  <div className="text-2xl font-black text-[#D4AF37]">{stat.value}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.2em] text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {roleCards.map((role) => (
                <div key={role.title} className="rounded-2xl border border-gray-800 bg-[#0d0d0d] p-5">
                  <h3 className="text-lg font-bold text-[#D4AF37] mb-3">{role.title}</h3>
                  <p className="text-sm leading-7 text-gray-300">{role.description}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {pitchSections.map((section) => (
                <div key={section.title} className="rounded-2xl border border-gray-800 bg-[#0d0d0d] p-5">
                  <h3 className="text-lg font-bold text-[#D4AF37] mb-3">{section.title}</h3>

                  {section.type === 'paragraph' && (
                    <p className="text-sm leading-7 text-gray-300">{section.content}</p>
                  )}

                  {section.type === 'list' && (
                    <ul className="space-y-2 text-sm text-gray-300">
                      {section.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="text-[#D4AF37]">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.type === 'ordered' && (
                    <ol className="space-y-2 text-sm text-gray-300 list-decimal pl-5">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 text-center text-xs text-gray-600 font-mono border-t border-gray-900 pt-6">
        Golden Aquilas • Property Management & Real Estate Operating System
      </footer>
    </div>
  );
}