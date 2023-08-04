import { useToast } from '@modules/ui/components/toasts/hooks/use-toast';
import { useState } from 'react';

export const useCopyText = () => {
  const [copiedText, setCopiedText] = useState<boolean>(false);

  const { toast } = useToast();

  const copy = async (text: string) => {
    try {
      if ('clipboard' in navigator) {
        await navigator.clipboard.writeText(text);
      } else {
        document.execCommand('copy', true, text);
      }
      setCopiedText(true);
    } catch (error) {
      toast({ variant: 'danger', content: 'Could not copy text to clipboard!' });
    }
  };

  return { copiedText, copy };
};
