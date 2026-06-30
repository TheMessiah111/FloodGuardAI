import { NextResponse } from 'next/server';
import { WeatherService } from '@/services/WeatherService';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');

    if (location) {
      const weather = await WeatherService.getWeatherByLocation(location);
      return NextResponse.json(weather);
    }

    const allWeather = await WeatherService.getAllWeather();
    return NextResponse.json(allWeather);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'An error occurred while fetching weather data' },
      { status: 500 }
    );
  }
}
