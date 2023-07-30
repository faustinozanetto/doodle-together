import { ApiResponseData } from '@modules/common/types/common.types';
import { createRoomValidationSchema } from '@modules/room/lib/room.validations';
import { NextRequest, NextResponse } from 'next/server';
import { CreateRoomApiResponse } from '@modules/room/types/room.types';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const parsed = createRoomValidationSchema.safeParse(body);
  if (!parsed.success) {
    const { errors } = parsed.error;

    return NextResponse.json<ApiResponseData>({ success: false, message: errors[0].message });
  }

  const { username, password } = parsed.data;

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/rooms`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!response.ok) {
    return NextResponse.json<ApiResponseData>({ success: false, message: 'Could not create room!' });
  }

  const data = await response.json();
  const { room, accessToken } = data;

  return NextResponse.json<ApiResponseData<CreateRoomApiResponse>>({
    success: true,
    data: { room, accessToken },
  });
}
