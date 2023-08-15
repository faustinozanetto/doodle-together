import React, { useState } from 'react';
import Image from 'next/image';
import { siteConfig } from '@config/config';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@modules/ui/components/dialog';
import { QRCodeIcon } from '@modules/ui/components/icons/qr-code-icon';
import { useQRCode } from '@modules/common/hooks/use-qr-code';
import RoomManagementTool from '../room-management-tool';
import { useRoomStore } from '@modules/state/room.slice';

const RoomManagementShareQR: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { room } = useRoomStore();

  const roomLink = `${siteConfig.url}/room/${room?.id}`;

  const { generateQRCode, result: qrCodeResult } = useQRCode(roomLink, { scale: 5, margin: 1, type: 'image/webp' });

  const handleToolClicked = () => {
    setModalOpen(true);
    generateQRCode();
  };

  return (
    <RoomManagementTool label="Share Room QR" variant="outline" icon={<QRCodeIcon />} onToolClicked={handleToolClicked}>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Share Room QR</DialogTitle>
            <DialogDescription>
              Collaborate seamlessly using QR codes! Scan the QR code to instantly join the shared canvas and unleash
              your creativity with others.
            </DialogDescription>
          </DialogHeader>
          <div className="border rounded-lg mx-auto">
            {qrCodeResult && (
              <Image className="rounded-lg shadow-lg" src={qrCodeResult} alt="Room QR Image" width={250} height={300} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </RoomManagementTool>
  );
};

export default RoomManagementShareQR;
