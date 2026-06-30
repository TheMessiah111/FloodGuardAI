import prisma from '@/lib/prisma';
import { AlertService } from './AlertService';

export class PredictionService {
  static async predict(data: {
    userId?: string | null;
    location: string;
    rainfall: number;
    temperature: number;
    humidity: number;
    riverLevel: number;
    windSpeed: number;
    soilMoisture: number;
  }) {
    // Mock AI Prediction Algorithm (Heuristic index mimicking ML classifier output)
    // Weights: Rainfall (35%), River Level (35%), Soil Moisture (15%), Humidity (5%), Wind Speed (10%)
    const rainfallScore = Math.min((data.rainfall / 150) * 35, 35); // capped at 150mm
    const riverLevelScore = Math.min((data.riverLevel / 8) * 35, 35); // capped at 8m
    const soilMoistureScore = Math.min((data.soilMoisture / 100) * 15, 15);
    const humidityScore = Math.min((data.humidity / 100) * 5, 5);
    const windScore = Math.min((data.windSpeed / 60) * 10, 10); // capped at 60km/h

    let riskPercentage = Math.round(
      rainfallScore + riverLevelScore + soilMoistureScore + humidityScore + windScore
    );
    if (riskPercentage > 100) riskPercentage = 100;
    if (riskPercentage < 0) riskPercentage = 0;

    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
    let message = '';
    let recommendedAction = '';

    if (riskPercentage < 35) {
      riskLevel = 'LOW';
      message = 'Flood risk is minimal. Weather and river indicators are stable.';
      recommendedAction = 'No immediate action required. Maintain general safety awareness.';
    } else if (riskPercentage < 65) {
      riskLevel = 'MEDIUM';
      message = 'Moderate flood risk. Elevated river levels or soil moisture may cause localized street flooding.';
      recommendedAction = 'Secure low-lying outdoor items and check community drainage systems.';
    } else if (riskPercentage < 80) {
      riskLevel = 'HIGH';
      message = 'High flood risk. Heavy rainfall combined with high river levels could inundate residential areas.';
      recommendedAction = 'Move valuable goods and documents to elevated platforms. Prepare an emergency bag.';
    } else {
      riskLevel = 'CRITICAL';
      message = 'Critical flood threat. High probability of severe community-wide flooding and structural inundation.';
      recommendedAction = 'Evacuate immediately to designated community high ground. Follow local safety officials.';
    }

    // Standard confidence score (mimicking a classifier's certainty)
    const confidenceScore = Math.round(85 + Math.random() * 12);

    // Save prediction in DB
    const prediction = await prisma.prediction.create({
      data: {
        userId: data.userId || null,
        location: data.location,
        rainfall: data.rainfall,
        temperature: data.temperature,
        humidity: data.humidity,
        riverLevel: data.riverLevel,
        windSpeed: data.windSpeed,
        soilMoisture: data.soilMoisture,
        riskPercentage,
        riskLevel,
        confidenceScore,
        message,
        recommendedAction,
      },
    });

    // Auto-create alert if risk exceeds 80% (CRITICAL risk level)
    if (riskPercentage >= 80) {
      await AlertService.createAlert({
        predictionId: prediction.id,
        location: prediction.location,
        riskLevel: prediction.riskLevel,
        message: `CRITICAL RISK WARNING: A ${riskPercentage}% flood risk has been detected in ${data.location}. ${message}`,
      });
    }

    // Also update Community current risk level in DB
    try {
      await prisma.community.updateMany({
        where: { name: data.location },
        data: { riskLevel },
      });
    } catch (e) {
      // Ignored if community doesn't exist yet
    }

    return prediction;
  }

  static async getHistory(limit = 10) {
    return prisma.prediction.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  static async getById(id: string) {
    return prisma.prediction.findUnique({
      where: { id },
    });
  }
}
