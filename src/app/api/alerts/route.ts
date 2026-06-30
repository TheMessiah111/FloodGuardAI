import { NextResponse } from 'next/server';
import { AlertService } from '@/services/AlertService';

export async function GET() {
  try {
    const alerts = await AlertService.getAlerts();
    return NextResponse.json(alerts);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'An error occurred while fetching alerts' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Alert ID is required' },
        { status: 400 }
      );
    }

    const alert = await AlertService.markAsRead(id);
    return NextResponse.json(alert);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'An error occurred while updating alert' },
      { status: 500 }
    );
  }
}
