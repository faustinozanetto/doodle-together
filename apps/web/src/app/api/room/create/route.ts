import { ApiResponseData } from '@modules/common/types/common.types';
import { createRoomValidationSchema } from '@modules/room/lib/room.validations';
import { NextRequest, NextResponse } from 'next/server';
import { CreateRoomApiResponse } from '@modules/room/types/room.types';
import { hashRoomPassword } from '@modules/room/lib/room-password.lib';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const parsed = createRoomValidationSchema.safeParse(body);
  if (!parsed.success) {
    const { errors } = parsed.error;

    return NextResponse.json<ApiResponseData>({ success: false, message: errors[0].message });
  }

  const { username, password } = parsed.data;

  /*
  const hashedPassword = await hashRoomPassword(password);

  const room = await prisma.room.create({
    data: {
      password: hashedPassword,
    },
  });

  if (!room) {
    return NextResponse.json<ApiResponseData>({ success: false, message: 'Could not create room!' }, { status: 404 });
  }
  */

  const response = await fetch(`${process.env.BACKEND_ENDPOINT}/rooms`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
    }),
  });

  if (!response.ok) {
    return NextResponse.json<ApiResponseData>({ success: false, message: 'Could not create room!' });
  }

  const data = await response.json();
  const { room, token } = data;

  const returnData = NextResponse.json<ApiResponseData<CreateRoomApiResponse>>({
    success: true,
    data: { room, token },
  });

  returnData.cookies.set({
    name: 'auth',
    value: token,
    httpOnly: true,
    maxAge: 60 * 60,
  });

  return returnData;
}
