import { useToast } from '@modules/ui/components/toasts/hooks/use-toast';

export const useCopyText = () => {
  const { toast } = useToast();

  const copy = async (text: string) => {
    try {
      if ('clipboard' in navigator) {
        await navigator.clipboard.writeText(text);
      } else {
        document.execCommand('copy', true, text);
      }
      toast({ variant: 'success', content: 'Text copied to clipboard!' });
    } catch (error) {
      toast({ variant: 'danger', content: 'Could not copy text to clipboard!' });
    }
  };

  return { copy };
};
