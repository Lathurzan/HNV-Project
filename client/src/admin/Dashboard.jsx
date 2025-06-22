import React from 'react';
import { Users, Calendar, DollarSign, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';

const Dashboard = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome to your HNV Building admin dashboard</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Projects */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Projects</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">128</h3>
            </div>
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
              <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 flex items-center text-sm font-medium">
              <ArrowUp className="h-4 w-4 mr-1" />
              12%
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">from last month</span>
          </div>
        </div>
        
        {/* Clients */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Clients</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">86</h3>
            </div>
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
              <Users className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 flex items-center text-sm font-medium">
              <ArrowUp className="h-4 w-4 mr-1" />
              8%
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">from last month</span>
          </div>
        </div>
        
        {/* Revenue */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">£86,589</h3>
            </div>
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
              <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 flex items-center text-sm font-medium">
              <ArrowUp className="h-4 w-4 mr-1" />
              24%
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">from last month</span>
          </div>
        </div>
        
        {/* Conversion */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Conversion Rate</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">64%</h3>
            </div>
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
              <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-red-500 flex items-center text-sm font-medium">
              <ArrowDown className="h-4 w-4 mr-1" />
              3%
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">from last month</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Projects</h2>
          </div>
          <div className="p-6">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {[
                { name: "Kitchen Renovation", client: "John Smith", status: "Completed", date: "May 28, 2025" },
                { name: "Bathroom Remodel", client: "Sarah Johnson", status: "In Progress", date: "June 5, 2025" },
                { name: "Garden Landscaping", client: "Michael Brown", status: "In Progress", date: "June 12, 2025" },
                { name: "Exterior Painting", client: "Emma Wilson", status: "Pending", date: "June 18, 2025" },
                { name: "Roof Repair", client: "David Lee", status: "Completed", date: "May 22, 2025" }
              ].map((project, index) => (
                <li key={index} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{project.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Client: {project.client}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        project.status === 'Completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                          : project.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {project.status}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{project.date}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-center">
              <button className="text-yellow-500 hover:text-yellow-600 text-sm font-medium">
                View All Projects
              </button>
            </div>
          </div>
        </div>
        
        {/* Performance Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Performance</h2>
          </div>
          <div className="p-6">
            <div className="h-72 flex items-end justify-between">
              {/* Simplified bar chart for demonstration */}
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => {
                const heights = ['60%', '75%', '45%', '90%', '65%', '80%'];
                return (
                  <div key={index} className="flex flex-col items-center w-1/6">
                    <div 
                      className="w-4/5 bg-yellow-500 dark:bg-yellow-600 rounded-t-lg transition-all duration-500"
                      style={{ height: heights[index] }}
                    ></div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{month}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 flex justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">£86,589</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Projects Completed</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">24</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Client Satisfaction</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">98%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
