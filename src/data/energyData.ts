// Energy consumption data per device type

export const DEVICE_ENERGY: Record<string, number | Record<number, number>> = {
  light: 10,        // 10W LED
  fan: {
    1: 25,
    2: 40,
    3: 55,
    4: 70,
    5: 85,
  },
  ac: 1500,         // 1.5kW
  tv: 120,          // 120W
  geyser: 2000,     // 2kW
  plug: 50,         // 50W average
  exhaust: 30,      // 30W
};

export const ELECTRICITY_RATE = 8; // ₹8 per kWh (Indian average)

// Calculate current energy for a device
export function getDeviceEnergy(type: string, isOn: boolean, speed?: number): number {
  if (!isOn) return 0;
  const data = DEVICE_ENERGY[type];
  if (typeof data === 'number') return data;
  if (typeof data === 'object' && speed !== undefined) {
    return (data as Record<number, number>)[speed] ?? 55;
  }
  return 0;
}

// Calculate monthly cost in ₹
export function calcMonthlyCost(totalWatts: number): number {
  return (totalWatts / 1000) * 24 * 30 * ELECTRICITY_RATE;
}

// Calculate daily usage in kWh
export function calcDailyKWh(totalWatts: number): number {
  return (totalWatts / 1000) * 24;
}

// Get energy ring color
export function getEnergyColor(watts: number): string {
  if (watts === 0) return '#444466';
  if (watts <= 100) return '#00FF88';
  if (watts <= 500) return '#FFD700';
  return '#FF4500';
}
