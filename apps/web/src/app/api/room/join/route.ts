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

  const { roomId, username, password } = parsed.data;

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/rooms/join`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      roomId,
      username,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.log({ data });

    return NextResponse.json<ApiResponseData>({ success: false, message: data.message });
  }

  const { room, accessToken } = data;

  return NextResponse.json<ApiResponseData<JoinRoomApiResponse>>({
    success: true,
    data: { room, accessToken },
  });
}
