import React from 'react';

export function Card({ children, className = '', ...props }) {
  return (
    <div className={`card ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <div className={`card-content ${className}`} {...props}>
      {children}
    </div>
  );
} 

// Label.js
export function Label({ htmlFor, children }) {
    return (
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
        {children}
      </label>
    );
  }
  
  // Input.js
  export function Input({ id, type = "text", value, onChange, ...props }) {
    return (
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        {...props}
      />
    );
  }

  export function StatCard({ title, value, change, icon }) {
    return (
      <div className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          <p className={`text-sm ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change > 0 ? `+${change}` : change}% vs last month
          </p>
        </div>
        <div className="text-gray-400">{icon}</div>
      </div>
    );
  };
  
