import { NextResponse } from 'next/server';
import { MapService } from '@/services/MapService';

export async function GET(request: Request) {
  try {
    const communities = await MapService.getCommunities();
    return NextResponse.json(communities);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'An error occurred while fetching community geography data' },
      { status: 500 }
    );
  }
}
