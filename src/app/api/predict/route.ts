import { NextResponse } from 'next/server';
import { PredictionService } from '@/services/PredictionService';
import { verifyToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { location, rainfall, temperature, humidity, riverLevel, windSpeed, soilMoisture } = body;

    if (
      !location ||
      rainfall === undefined ||
      temperature === undefined ||
      humidity === undefined ||
      riverLevel === undefined ||
      windSpeed === undefined ||
      soilMoisture === undefined
    ) {
      return NextResponse.json(
        { error: 'All prediction inputs are required' },
        { status: 400 }
      );
    }

    let userId: string | null = null;
    const cookiesHeader = request.headers.get('cookie') || '';
    const tokenCookie = cookiesHeader
      .split(';')
      .find((c) => c.trim().startsWith('token='));
      
    if (tokenCookie) {
      const token = tokenCookie.split('=')[1];
      const decoded = verifyToken(token);
      if (decoded) {
        userId = decoded.userId;
      }
    }

    const prediction = await PredictionService.predict({
      userId,
      location,
      rainfall: Number(rainfall),
      temperature: Number(temperature),
      humidity: Number(humidity),
      riverLevel: Number(riverLevel),
      windSpeed: Number(windSpeed),
      soilMoisture: Number(soilMoisture),
    });

    return NextResponse.json(prediction, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'An error occurred during prediction calculation' },
      { status: 500 }
    );
  }
}
