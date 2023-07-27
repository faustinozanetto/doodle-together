import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { body } = request;
  console.log({ body });

  return NextResponse.json({ message: 'Join success!' });
}
