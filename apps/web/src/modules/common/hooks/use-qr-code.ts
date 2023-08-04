import { useToast } from '@modules/ui/components/toasts/hooks/use-toast';
import { toDataURL, QRCodeToDataURLOptions } from 'qrcode';
import { useState } from 'react';

export const useQRCode = (link: string, options?: QRCodeToDataURLOptions) => {
  const { toast } = useToast();

  const [result, setResult] = useState<string | null>(null);

  const generateQRCode = async () => {
    if (result) return;

    try {
      const qrcode = await toDataURL(link, options);
      setResult(qrcode);
    } catch (error) {
      toast({ variant: 'danger', content: 'Could not generate QR Code!' });
    }
  };

  return { result, generateQRCode };
};
