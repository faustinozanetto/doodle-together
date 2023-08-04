import React from 'react';
import { siteConfig } from '@config/config';
import { useCopyText } from '@modules/common/hooks/use-copy-text';
import { roomState } from '@modules/state/room.slice';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@modules/ui/components/dialog';
import { IconButton, iconButtonVariants } from '@modules/ui/components/icon-button/icon-button';
import { CopyIcon } from '@modules/ui/components/icons/copy-icon';
import { LoadingIcon } from '@modules/ui/components/icons/loading-icon';
import { ShareIcon } from '@modules/ui/components/icons/share-icon';
import { useSnapshot } from 'valtio';

const RoomManagementShareLink: React.FC = () => {
  const roomSnapshot = useSnapshot(roomState);
  const { copy, copiedText } = useCopyText();

  const roomLink = `${siteConfig.url}/room/${roomSnapshot.room?.roomId}`;

  const handleCopyLink = async () => {
    await copy(roomLink);
  };

  return (
    <div
      style={{
        pointerEvents: 'all',
      }}
    >
      <Dialog>
        <DialogTrigger aria-label="Share Room Link" className={iconButtonVariants({ variant: 'primary' })}>
          <ShareIcon />
        </DialogTrigger>
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

            <IconButton
              aria-label="Copy Room Link"
              icon={copiedText ? <CopyIcon /> : <LoadingIcon />}
              onClick={handleCopyLink}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomManagementShareLink;
