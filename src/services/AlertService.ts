import prisma from '@/lib/prisma';

export class AlertService {
  static async createAlert(data: {
    predictionId: string;
    location: string;
    riskLevel: string;
    message: string;
  }) {
    return prisma.alert.create({
      data: {
        predictionId: data.predictionId,
        location: data.location,
        riskLevel: data.riskLevel,
        message: data.message,
        isRead: false,
      },
    });
  }

  static async getAlerts(limit = 20) {
    return prisma.alert.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  static async markAsRead(id: string) {
    return prisma.alert.update({
      where: { id },
      data: { isRead: true },
    });
  }

  static async getActiveAlertsCount() {
    return prisma.alert.count({
      where: { isRead: false },
    });
  }
}
