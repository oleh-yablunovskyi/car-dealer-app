import React from 'react';
import VehicleFilter from './components/vehicle-filter';

interface Make {
  MakeId: number;
  MakeName: string;
}

async function getVehicleMakes(): Promise<Make[]> {
  const baseUrl = process.env.NEXT_PUBLIC_VEHICLE_API_BASE_URL;
  const res = await fetch(
    `${baseUrl}/GetMakesForVehicleType/car?format=json`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch vehicle makes');
  }

  const data = await res.json();
  return data.Results;
}

export default async function Page() {
  const vehicleMakes = await getVehicleMakes();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <VehicleFilter vehicleMakes={vehicleMakes} />
    </main>
  );
}
