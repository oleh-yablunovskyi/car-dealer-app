import React from 'react';
import { notFound } from 'next/navigation';
import { getYears } from '@/app/utils/getYears';

interface Model {
  Model_ID: number;
  Model_Name: string;
}

interface Params {
  makeId: string;
  year: string;
}

async function getVehicleModels(makeId: string, year: string): Promise<Model[]> {
  const baseUrl = process.env.NEXT_PUBLIC_VEHICLE_API_BASE_URL;
  const res = await fetch(
    `${baseUrl}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch vehicle models');
  }

  const data = await res.json();

  if (data.Results.length === 0) {
    notFound();
  }

  return data.Results;
}

export async function generateStaticParams() {
  const makeRes = await fetch(
    'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
  );

  if (!makeRes.ok) {
    throw new Error('Failed to fetch vehicle makes');
  }

  const makeData = await makeRes.json();
  const makes = makeData.Results;

  const yearsArray = getYears();

  const paramsList = makes.flatMap((make: { MakeId: number }) =>
    yearsArray.map((year) => ({
      makeId: make.MakeId.toString(),
      year: year.toString(),
    }))
  );

  return paramsList;
}

export default async function Page({ params }: { params: Params }) {
  const { makeId, year } = params;

  let vehicleModels: Model[] = [];

  try {
    vehicleModels = await getVehicleModels(makeId, year);
  } catch (error) {
    console.error(error);
    throw error;
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Vehicle Models for Make ID {makeId} in {year}
      </h1>
      {vehicleModels.length > 0 ? (
        <ul className="space-y-2">
          {vehicleModels.map((model) => (
            <li
              key={model.Model_ID}
              className="border p-2 rounded-lg bg-gray-800 shadow-md m-2"
            >
              {model.Model_Name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No models found for this make and year.</p>
      )}
    </main>
  );
}
