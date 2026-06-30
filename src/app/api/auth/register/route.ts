import { NextResponse } from 'next/server';
import { AuthService } from '@/services/AuthService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, phone, state, lga, community } = body;

    if (!name || !email || !password || !phone || !state || !lga || !community) {
      return NextResponse.json(
        { error: 'All registration fields are required' },
        { status: 400 }
      );
    }

    const existingUser = await AuthService.findByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'A user with this email already exists' },
        { status: 400 }
      );
    }

    const user = await AuthService.register({
      name,
      email,
      passwordHash: password,
      phone,
      state,
      lga,
      community,
    });

    return NextResponse.json(
      { message: 'Registration successful', userId: user.id },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'An error occurred during registration' },
      { status: 500 }
    );
  }
}
