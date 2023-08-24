'use client';
import { CanvasRenderer } from '@doodle-together/canvas-renderer';
import RoomCamera from '@modules/room/components/camera/room-camera';
import RoomCustomization from '@modules/room/components/customization/room-customization';
import RoomManagement from '@modules/room/components/management/room-management';
import RoomTools from '@modules/room/components/tools/room-tools';
import RoomUsers from '@modules/room/components/users/room-users';

export default function NewCanvasPage() {
  return (
    <div className="fixed bottom-0 right-0 left-0 top-20 overflow-hidden">
      <CanvasRenderer />

      {/* Panels */}
      <div className="pointer-events-none absolute inset-0 p-2 flex flex-col justify-between select-none overflow-clip">
        {/* Top */}
        <div className="flex justify-end items-start">
          {/* <RoomUsers /> */}
          <RoomCustomization />
        </div>

        {/* Bottom  */}
        <div className="flex justify-between items-end">
          <RoomCamera />
          <RoomTools />
          <RoomManagement />
        </div>
      </div>
    </div>
  );
}
