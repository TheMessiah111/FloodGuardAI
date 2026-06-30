import prisma from '@/lib/prisma';
import { Community } from '@/types';

// Default communities prone to flooding in Nigeria (River Benue/Niger and coastal areas)
const DEFAULT_COMMUNITIES = [
  { name: 'Lokoja (Kogi)', lga: 'Lokoja', state: 'Kogi', latitude: 7.8023, longitude: 6.7420, riskLevel: 'HIGH' },
  { name: 'Makurdi (Benue)', lga: 'Makurdi', state: 'Benue', latitude: 7.7310, longitude: 8.5214, riskLevel: 'HIGH' },
  { name: 'Yenagoa (Bayelsa)', lga: 'Yenagoa', state: 'Bayelsa', latitude: 4.9267, longitude: 6.2676, riskLevel: 'CRITICAL' },
  { name: 'Patani (Delta)', lga: 'Patani', state: 'Delta', latitude: 5.2231, longitude: 6.1884, riskLevel: 'HIGH' },
  { name: 'Onitsha (Anambra)', lga: 'Onitsha North', state: 'Anambra', latitude: 6.1527, longitude: 6.7865, riskLevel: 'MEDIUM' },
  { name: 'Baro (Niger)', lga: 'Agaie', state: 'Niger', latitude: 8.5833, longitude: 6.4167, riskLevel: 'LOW' },
  { name: 'Ibaji (Kogi)', lga: 'Ibaji', state: 'Kogi', latitude: 7.1523, longitude: 6.8203, riskLevel: 'CRITICAL' },
  { name: 'Lagos Island (Lagos)', lga: 'Lagos Island', state: 'Lagos', latitude: 6.4549, longitude: 3.4246, riskLevel: 'MEDIUM' },
  { name: 'Yola (Adamawa)', lga: 'Yola North', state: 'Adamawa', latitude: 9.2035, longitude: 12.4954, riskLevel: 'LOW' },
  { name: 'Jalingo (Taraba)', lga: 'Jalingo', state: 'Taraba', latitude: 8.8922, longitude: 11.3602, riskLevel: 'LOW' },
  { name: 'Port Harcourt (Rivers)', lga: 'Port Harcourt', state: 'Rivers', latitude: 4.8156, longitude: 7.0498, riskLevel: 'LOW' },
  { name: 'Ilorin (Kwara)', lga: 'Ilorin East', state: 'Kwara', latitude: 8.4799, longitude: 4.5418, riskLevel: 'LOW' },
  { name: 'Calabar (Cross River)', lga: 'Calabar Municipal', state: 'Cross River', latitude: 4.9757, longitude: 8.3417, riskLevel: 'LOW' },
];

export class MapService {
  static async getCommunities(): Promise<Community[]> {
    let communities = await prisma.community.findMany();

    const existingNames = new Set(communities.map(c => c.name));
    const missing = DEFAULT_COMMUNITIES.filter(c => !existingNames.has(c.name));

    if (missing.length > 0) {
      // Auto-populate default communities in DB if missing
      await prisma.community.createMany({
        data: missing,
      });
      communities = await prisma.community.findMany();
    }

    return communities.map((c) => ({
      ...c,
      riskLevel: c.riskLevel as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL',
    }));
  }

  static async updateCommunityRisk(name: string, riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL') {
    return prisma.community.updateMany({
      where: { name },
      data: { riskLevel },
    });
  }
}
