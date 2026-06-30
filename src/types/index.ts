export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  state: string;
  lga: string;
  community: string;
  createdAt: string;
  updatedAt: string;
}

export interface Prediction {
  id: string;
  userId?: string | null;
  location: string; // Community / LGA name
  rainfall: number; // mm
  temperature: number; // °C
  humidity: number; // %
  riverLevel: number; // m
  windSpeed: number; // km/h
  soilMoisture: number; // %
  riskPercentage: number; // 0-100
  riskLevel: RiskLevel;
  confidenceScore: number; // 0-100
  message: string;
  recommendedAction: string;
  createdAt: string;
}

export interface Alert {
  id: string;
  predictionId: string;
  location: string;
  riskLevel: RiskLevel;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface Weather {
  id: string;
  location: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  pressure: number;
  updatedAt: string;
}

export interface Community {
  id: string;
  name: string;
  lga: string;
  state: string;
  latitude: number;
  longitude: number;
  riskLevel: RiskLevel;
}

export interface DashboardStats {
  totalPredictions: number;
  activeAlerts: number;
  averageRiskPercentage: number;
  criticalCommunitiesCount: number;
  riskTrend: { month: string; avgRisk: number }[];
  recentPredictions: Prediction[];
  latestAlerts: Alert[];
}
