import { ApiResponseData } from '@modules/common/types/common.types';
import { createRoomValidationSchema } from '@modules/room/lib/room.validations';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@doodle-together/database';
import { CreateRoomApiResponse } from '@modules/room/types/room.types';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const parsed = createRoomValidationSchema.safeParse(body);
  if (!parsed.success) {
    const { errors } = parsed.error;
    console.log({ errors });

    return NextResponse.json<ApiResponseData>({ success: false, message: errors[0].message });
  }

  const { username, password } = parsed.data;

  const room = await prisma.room.create({
    data: {
      password,
    },
  });

  if (!room) {
    return NextResponse.json<ApiResponseData>({ success: false, message: 'Could not create room!' });
  }

  request.cookies.set('username', username);

  return NextResponse.json<ApiResponseData<CreateRoomApiResponse>>({ success: true, data: room });
}
