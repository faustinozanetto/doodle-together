import React from 'react';
import RoomPanel from '../room-panel';
import { useCanvasCamera } from '@doodle-together/canvas-renderer';
import RoomCameraZoom from './room-camera-zoom';
import { ZoomInIcon } from '@modules/ui/components/icons/zoom-in-icon';
import { ZoomOutIcon } from '@modules/ui/components/icons/zoom-in-out';

const RoomCamera: React.FC = () => {
  const { zoomIn, zoomOut } = useCanvasCamera();

  return (
    <RoomPanel label="Camera">
      <div className="flex gap-2">
        <RoomCameraZoom type="in" icon={<ZoomInIcon className="stroke-current" />} onZoomClicked={zoomIn} />
        <RoomCameraZoom type="out" icon={<ZoomOutIcon className="stroke-current" />} onZoomClicked={zoomOut} />
      </div>
    </RoomPanel>
  );
};

export default RoomCamera;
