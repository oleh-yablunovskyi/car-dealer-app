'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getYears } from '../utils/getYears';

interface Make {
  MakeId: number;
  MakeName: string;
}

interface VehicleFilterProps {
  vehicleMakes: Make[];
}

const VehicleFilter: React.FC<VehicleFilterProps> = ({ vehicleMakes }) => {
  const [selectedMakeId, setSelectedMakeId] = useState<number | ''>('');
  const [selectedYear, setSelectedYear] = useState<number | ''>('');

  const yearsArray = getYears();

  return (
    <div className="max-w-md w-full">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Select Vehicle Make and Model Year
      </h1>
      <div className="mb-6">
        <label
          htmlFor="make"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Vehicle Make
        </label>
        <select
          id="make"
          name="make"
          className={`block w-full border border-gray-300 bg-gray-900 rounded-md p-2`}
          value={selectedMakeId}
          onChange={e =>
            setSelectedMakeId(e.target.value ? Number(e.target.value) : '')
          }
        >
          <option value="">Select a make</option>
          {vehicleMakes.map(make => (
            <option key={make.MakeId} value={make.MakeId}>
              {make.MakeName}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label
          htmlFor="year"
          className="block text-sm font-medium text-gray-00 mb-2"
        >
          Model Year
        </label>
        <select
          id="year"
          name="year"
          className="block w-full border border-gray-300 bg-gray-900 rounded-md p-2"
          value={selectedYear}
          onChange={e =>
            setSelectedYear(e.target.value ? Number(e.target.value) : '')
          }
        >
          <option value="">Select a year</option>
          {yearsArray.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div>
        {selectedMakeId && selectedYear ? (
          <Link
            href={`/result/${selectedMakeId}/${selectedYear}`}
            className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </Link>
        ) : (
          <button
            disabled
            className="block w-full text-center bg-gray-400 text-white font-bold py-2 px-4 rounded cursor-not-allowed"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default VehicleFilter;
