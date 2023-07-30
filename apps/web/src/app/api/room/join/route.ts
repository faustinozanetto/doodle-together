import { ApiResponseData } from '@modules/common/types/common.types';
import { joinRoomValidationSchema } from '@modules/room/lib/room.validations';
import { JoinRoomApiResponse } from '@modules/room/types/room.types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const parsed = joinRoomValidationSchema.safeParse(body);
  if (!parsed.success) {
    const { errors } = parsed.error;

    return NextResponse.json<ApiResponseData>({ success: false, message: errors[0].message });
  }

  const { id: roomId, username, password } = parsed.data;

  /*
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
  */

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/rooms/join`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      roomId,
      username,
    }),
  });

  if (!response.ok) {
    return NextResponse.json<ApiResponseData>({ success: false, message: 'Could not create room!' });
  }

  const data = await response.json();
  const { room, accessToken } = data;

  return NextResponse.json<ApiResponseData<JoinRoomApiResponse>>({
    success: true,
    data: { room, accessToken },
  });
}
