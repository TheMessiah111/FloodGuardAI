import { NextResponse } from 'next/server';
import { DashboardService } from '@/services/DashboardService';

export async function GET() {
  try {
    const stats = await DashboardService.getDashboardStats();
    return NextResponse.json(stats);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'An error occurred while compiling dashboard statistics' },
      { status: 500 }
    );
  }
}
