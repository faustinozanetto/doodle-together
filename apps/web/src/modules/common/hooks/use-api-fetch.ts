import { useToast } from '@modules/ui/components/toasts/hooks/use-toast';
import { ApiResponseData } from '../types/common.types';

export const useApiFetch = <TData>(endpoint: string) => {
  const { toast } = useToast();

  const fetchData = async (options?: RequestInit): Promise<TData | null> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}${endpoint}`, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    const data = await response.json();
    if (!response.ok) {
      let error = 'An error occurred!';
      if ('message' in data) error = data.message;
      toast({ variant: 'danger', content: error });
      return null;
    }

    return data;
  };

  return { fetchData };
};
