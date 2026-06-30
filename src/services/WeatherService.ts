import prisma from '@/lib/prisma';

export class WeatherService {
  static async getWeatherByLocation(location: string) {
    let weather = await prisma.weather.findUnique({
      where: { location },
    });

    const currentMonth = new Date().getMonth();
    const isRainySeason = currentMonth >= 3 && currentMonth <= 9; // April to October

    const generateRandomWeather = () => {
      let temperature, humidity, rainfall, windSpeed;
      if (isRainySeason) {
        temperature = Math.round(24 + Math.random() * 5); // 24°C to 29°C
        humidity = Math.round(75 + Math.random() * 20);   // 75% to 95%
        rainfall = Math.round(40 + Math.random() * 100);  // 40mm to 140mm
        windSpeed = Math.round(10 + Math.random() * 20);  // 10 to 30 km/h
      } else {
        temperature = Math.round(28 + Math.random() * 7); // 28°C to 35°C
        humidity = Math.round(30 + Math.random() * 30);   // 30% to 60%
        rainfall = Math.round(Math.random() * 15);        // 0 to 15mm
        windSpeed = Math.round(5 + Math.random() * 15);   // 5 to 20 km/h
      }
      const pressure = Math.round(1008 + Math.random() * 10);
      return { temperature, humidity, rainfall, windSpeed, pressure };
    };

    // If no weather recorded for this location yet, create initial mock record
    if (!weather) {
      weather = await prisma.weather.create({
        data: {
          location,
          ...generateRandomWeather(),
        },
      });
    } else {
      // If it exists but was updated more than 1 hour ago, update with new real-time values
      const oneHourAgo = new Date(Date.now() - 1000 * 60 * 60);
      if (weather.updatedAt < oneHourAgo) {
        weather = await prisma.weather.update({
          where: { location },
          data: {
            ...generateRandomWeather(),
            updatedAt: new Date(),
          },
        });
      }
    }

    return weather;
  }

  static async getAllWeather() {
    return prisma.weather.findMany({
      orderBy: { updatedAt: 'desc' },
    });
  }

  static async updateWeather(
    location: string,
    data: {
      temperature: number;
      humidity: number;
      rainfall: number;
      windSpeed: number;
      pressure: number;
    }
  ) {
    return prisma.weather.upsert({
      where: { location },
      update: {
        ...data,
        updatedAt: new Date(),
      },
      create: {
        location,
        ...data,
      },
    });
  }
}
