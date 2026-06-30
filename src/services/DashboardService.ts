import prisma from '@/lib/prisma';
import { Prediction, Alert } from '@/types';
import { hashPassword } from '@/lib/auth';
import { MapService } from './MapService';
import { WeatherService } from './WeatherService';

export class DashboardService {
  static async getDashboardStats() {
    // 1. Check if we need to auto-seed the application database
    const predictionsCount = await prisma.prediction.count();
    
    if (predictionsCount === 0) {
      // Seed default user
      const passHash = await hashPassword('password123');
      const seedUser = await prisma.user.upsert({
        where: { email: 'admin@floodguard.gov.ng' },
        update: {},
        create: {
          name: 'Professor Ibrahim Musa',
          email: 'admin@floodguard.gov.ng',
          password: passHash,
          phone: '08012345678',
          state: 'Kogi',
          lga: 'Lokoja',
          community: 'Adankolo',
        },
      });

      // Ensure communities are seeded
      const communities = await MapService.getCommunities();

      // Seed weather entries for each community
      for (const c of communities) {
        await WeatherService.getWeatherByLocation(c.name);
      }

      // Seed historical prediction simulations
      const dummyPredictions = [
        {
          userId: seedUser.id,
          location: 'Makurdi (Benue)',
          rainfall: 120,
          temperature: 27,
          humidity: 82,
          riverLevel: 5.8,
          windSpeed: 18,
          soilMoisture: 85,
          riskPercentage: 86,
          riskLevel: 'CRITICAL',
          confidenceScore: 94,
          message: 'Critical flood threat. High probability of severe community-wide flooding.',
          recommendedAction: 'Evacuate immediately to designated community high ground.',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        },
        {
          userId: seedUser.id,
          location: 'Ibaji (Kogi)',
          rainfall: 135,
          temperature: 28,
          humidity: 85,
          riverLevel: 6.2,
          windSpeed: 14,
          soilMoisture: 90,
          riskPercentage: 92,
          riskLevel: 'CRITICAL',
          confidenceScore: 96,
          message: 'Critical flood threat. River overflow is imminent.',
          recommendedAction: 'Evacuate immediately to designated community high ground.',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
        },
        {
          userId: seedUser.id,
          location: 'Yenagoa (Bayelsa)',
          rainfall: 95,
          temperature: 26,
          humidity: 88,
          riverLevel: 4.5,
          windSpeed: 22,
          soilMoisture: 75,
          riskPercentage: 74,
          riskLevel: 'HIGH',
          confidenceScore: 91,
          message: 'High flood risk. Hydro-meteorological readings are unstable.',
          recommendedAction: 'Move valuable items and documents to safety. Prepare an emergency bag.',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        },
        {
          userId: seedUser.id,
          location: 'Lokoja (Kogi)',
          rainfall: 80,
          temperature: 29,
          humidity: 78,
          riverLevel: 4.1,
          windSpeed: 10,
          soilMoisture: 65,
          riskPercentage: 68,
          riskLevel: 'HIGH',
          message: 'High flood risk. Heavy rainfall combined with high river levels detected.',
          recommendedAction: 'Move valuable items and documents to safety.',
          confidenceScore: 89,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
        },
        {
          userId: seedUser.id,
          location: 'Lagos Island (Lagos)',
          rainfall: 55,
          temperature: 30,
          humidity: 74,
          riverLevel: 2.1,
          windSpeed: 25,
          soilMoisture: 50,
          riskPercentage: 52,
          riskLevel: 'MEDIUM',
          confidenceScore: 87,
          message: 'Moderate flood risk. Elevated coastal tides.',
          recommendedAction: 'Secure low-lying outdoor items and check community drainage systems.',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
        },
        {
          userId: seedUser.id,
          location: 'Baro (Niger)',
          rainfall: 15,
          temperature: 32,
          humidity: 50,
          riverLevel: 1.2,
          windSpeed: 8,
          soilMoisture: 30,
          riskPercentage: 18,
          riskLevel: 'LOW',
          confidenceScore: 92,
          message: 'Flood risk is minimal. Weather and river levels are stable.',
          recommendedAction: 'No immediate action required. Maintain general safety awareness.',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4 days ago
        },
      ];

      for (const p of dummyPredictions) {
        const pred = await prisma.prediction.create({
          data: {
            userId: p.userId,
            location: p.location,
            rainfall: p.rainfall,
            temperature: p.temperature,
            humidity: p.humidity,
            riverLevel: p.riverLevel,
            windSpeed: p.windSpeed,
            soilMoisture: p.soilMoisture,
            riskPercentage: p.riskPercentage,
            riskLevel: p.riskLevel,
            confidenceScore: p.confidenceScore,
            message: p.message,
            recommendedAction: p.recommendedAction,
            createdAt: p.createdAt,
          },
        });

        // Seed warnings/alerts for critical risk level instances
        if (p.riskPercentage >= 80) {
          await prisma.alert.create({
            data: {
              predictionId: pred.id,
              location: p.location,
              riskLevel: p.riskLevel,
              message: `CRITICAL RISK WARNING: A ${p.riskPercentage}% flood risk has been detected in ${p.location}. ${p.message}`,
              isRead: false,
              createdAt: p.createdAt,
            },
          });
        }

        // Update community coordinates risk level
        await prisma.community.updateMany({
          where: { name: p.location },
          data: { riskLevel: p.riskLevel },
        });
      }
    }

    // 2. Query actual data
    const totalPredictions = await prisma.prediction.count();
    const activeAlerts = await prisma.alert.count({
      where: { isRead: false },
    });

    const avgRiskResult = await prisma.prediction.aggregate({
      _avg: {
        riskPercentage: true,
      },
    });
    const averageRiskPercentage = avgRiskResult._avg.riskPercentage
      ? Math.round(avgRiskResult._avg.riskPercentage)
      : 0;

    const criticalCommunitiesCount = await prisma.community.count({
      where: {
        riskLevel: {
          in: ['HIGH', 'CRITICAL'],
        },
      },
    });

    const recentPredictionsRaw = await prisma.prediction.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    const latestAlertsRaw = await prisma.alert.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    const recentPredictions: Prediction[] = recentPredictionsRaw.map((p) => ({
      ...p,
      riskLevel: p.riskLevel as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL',
      createdAt: p.createdAt.toISOString(),
    }));

    const latestAlerts: Alert[] = latestAlertsRaw.map((a) => ({
      ...a,
      riskLevel: a.riskLevel as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL',
      createdAt: a.createdAt.toISOString(),
    }));

    const riskTrend = [
      { month: 'Jan', avgRisk: 12 },
      { month: 'Feb', avgRisk: 18 },
      { month: 'Mar', avgRisk: 22 },
      { month: 'Apr', avgRisk: 45 },
      { month: 'May', avgRisk: 68 },
      { month: 'Jun', avgRisk: 82 },
    ];

    return {
      totalPredictions,
      activeAlerts,
      averageRiskPercentage,
      criticalCommunitiesCount,
      riskTrend,
      recentPredictions,
      latestAlerts,
    };
  }
}
