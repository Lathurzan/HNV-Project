import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  MessageCircle,
  Globe,
  Calendar,
  ChevronRight,
} from 'lucide-react';

const DateCard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const day = currentTime.toLocaleDateString(undefined, { weekday: 'long' });
  const date = currentTime.toLocaleDateString(undefined, { day: 'numeric' });
  const month = currentTime.toLocaleDateString(undefined, { month: 'long' });
  const year = currentTime.toLocaleDateString(undefined, { year: 'numeric' });
  const time = currentTime.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-6 w-full max-w-sm text-white overflow-hidden relative">
      <div className="absolute top-4 right-4 opacity-20">
        <Calendar className="h-24 w-24" />
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-blue-200 mb-1">Today is</p>
            <h2 className="text-2xl font-bold">{day}</h2>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-blue-200 mb-1">Current Time</p>
            <h2 className="text-2xl font-bold">{time}</h2>
          </div>
        </div>

        <div className="mt-8 flex items-end justify-between">
          <div className="text-6xl font-bold">{date}</div>
          <div className="text-right">
            <p className="text-xl font-semibold">{month}</p>
            <p className="text-2xl font-bold text-blue-200">{year}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon: Icon, label, value, bgColor, iconColor }) => {
  return (
    <div className="flex flex-col rounded-2xl shadow-md p-5 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-start">
        <div
          className={`p-3 rounded-xl`}
          style={{ backgroundColor: bgColor, color: iconColor }}
        >
          <Icon className="h-6 w-6" />
        </div>
        <ChevronRight className="text-gray-300 dark:text-gray-500 mt-1" />
      </div>
      <div className="mt-4">
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{label}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [serviceCount, setServiceCount] = useState(0);
  const [testimonialCount, setTestimonialCount] = useState(0);
  const [sectorCount, setSectorCount] = useState(0);

  useEffect(() => {
    fetchServiceCount();
    fetchTestimonialCount();
    fetchSectorCount();
  }, []);

  const fetchServiceCount = async () => {
    try {
      const res = await fetch('/api/services/count');
      const data = await res.json();
      if (res.ok) setServiceCount(data.count);
    } catch {
      setServiceCount(0);
    }
  };

  const fetchTestimonialCount = async () => {
    try {
      const res = await fetch('/api/testimonials/count');
      const data = await res.json();
      if (res.ok) setTestimonialCount(data.count);
    } catch {
      setTestimonialCount(0);
    }
  };

  const fetchSectorCount = async () => {
    try {
      const res = await fetch('/api/sectors/count');
      const data = await res.json();
      if (res.ok) setSectorCount(data.count);
    } catch {
      setSectorCount(0);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header and DateCard side by side on md+ */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-md">
            Welcome back, here's what's happening with HNV Building today.
          </p>
        </div>
        <DateCard />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <InfoCard
          icon={Briefcase}
          label="Services Added"
          value={serviceCount}
          bgColor="#E0F2FE"
          iconColor="#0284C7"
        />
        <InfoCard
          icon={MessageCircle}
          label="Testimonials"
          value={testimonialCount}
          bgColor="#DCFCE7"
          iconColor="#16A34A"
        />
        <InfoCard
          icon={Globe}
          label="Market Sectors"
          value={sectorCount}
          bgColor="#FEF3C7"
          iconColor="#CA8A04"
        />
        {/* Add a placeholder card or more stats here if needed */}
      </div>
    </div>
  );
};

export default Dashboard;
