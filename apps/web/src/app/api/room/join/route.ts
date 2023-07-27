import { prisma } from '@doodle-together/database';
import { ApiResponseData } from '@modules/common/types/common.types';
import { validateRoomPassword } from '@modules/room/lib/room-password.lib';
import { joinRoomValidationSchema } from '@modules/room/lib/room.validations';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const parsed = joinRoomValidationSchema.safeParse(body);
  if (!parsed.success) {
    const { errors } = parsed.error;

    return NextResponse.json<ApiResponseData>({ success: false, message: errors[0].message });
  }

  const { id, username, password } = parsed.data;

  const room = await prisma.room.findFirst({
    where: {
      id,
    },
  });

  if (!room) {
    return NextResponse.json<ApiResponseData>({ success: false, message: 'Could not find room!' }, { status: 404 });
  }

  const validPassword = await validateRoomPassword(password, room.password);

  if (!validPassword) {
    return NextResponse.json<ApiResponseData>({ success: false, message: 'Invalid room password!' }, { status: 403 });
  }

  return NextResponse.json<ApiResponseData>({ success: true, message: 'Join success!' }, { status: 200 });
}
