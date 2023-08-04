import React, { useState } from 'react';
import { siteConfig } from '@config/config';
import { useCopyText } from '@modules/common/hooks/use-copy-text';
import { roomState } from '@modules/state/room.slice';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@modules/ui/components/dialog';
import { IconButton } from '@modules/ui/components/icon-button/icon-button';
import { CopyIcon } from '@modules/ui/components/icons/copy-icon';
import { ShareIcon } from '@modules/ui/components/icons/share-icon';
import { useSnapshot } from 'valtio';
import RoomManagementTool from '../room-management-tool';

const RoomManagementShareLink: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const roomSnapshot = useSnapshot(roomState);
  const { copy } = useCopyText();

  const roomLink = `${siteConfig.url}/room/${roomSnapshot.room?.roomId}`;

  const handleToolClicked = () => {
    setModalOpen(true);
  };

  const handleCopyLink = async () => {
    await copy(roomLink);
  };

  return (
    <RoomManagementTool label="Share Room Link" icon={<ShareIcon />} onToolClicked={handleToolClicked}>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Share Room Link</DialogTitle>
            <DialogDescription>
              Invite others to collaborate in real-time! Share the unique room link to join the creative canvas
              instantly and work together on your masterpiece.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-foreground p-2 border rounded-lg shadow-lg flex justify-between items-center">
            <span className="text-ellipsis overflow-hidden whitespace-nowrap w-[24rem]">{roomLink}</span>

            <IconButton aria-label="Copy Room Link" icon={<CopyIcon />} onClick={handleCopyLink} />
          </div>
        </DialogContent>
      </Dialog>
    </RoomManagementTool>
  );
};

export default RoomManagementShareLink;
