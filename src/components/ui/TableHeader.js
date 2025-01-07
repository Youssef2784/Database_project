import React from 'react';

export function TableHeader({ headers }) {
  return (
    <thead>
      <tr className="border-b">
        {headers.map((header, index) => (
          <th key={index} className="text-left py-3 px-4">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
} 