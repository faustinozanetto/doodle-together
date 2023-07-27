import { ApiResponseData } from '@modules/common/types/common.types';
import { createRoomValidationSchema } from '@modules/room/lib/room.validations';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const parsed = createRoomValidationSchema.safeParse(body);
  if (!parsed.success) {
    const { errors } = parsed.error;
    console.log({ errors });

    return NextResponse.json<ApiResponseData>({ success: false, message: errors[0].message });
  }

  const { username, password } = parsed.data;

  const roomId = crypto.randomUUID();

  console.log({ roomId });

  return NextResponse.json<ApiResponseData>({ success: true, message: 'Create success!' });
}
