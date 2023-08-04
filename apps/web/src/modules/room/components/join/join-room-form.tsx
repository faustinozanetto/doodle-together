'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

import { joinRoomValidationSchema } from '@modules/room/lib/room.validations';
import { Button } from '@modules/ui/components/button/button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@modules/ui/components/forms/forms';
import { Input } from '@modules/ui/components/forms/input';
import { PasswordInput } from '@modules/ui/components/forms/password-input';
import { LoadingIcon } from '@modules/ui/components/icons/loading-icon';
import { useSearchParams } from 'next/navigation';

export type JoinRoomFormData = z.infer<typeof joinRoomValidationSchema>;

type JoinRoomFormProps = {
  isPending: boolean;
  onSubmit: (formData: JoinRoomFormData) => void;
};

const JoinRoomForm: React.FC<JoinRoomFormProps> = (props) => {
  const { onSubmit, isPending } = props;

  const searchParams = useSearchParams();

  const form = useForm<JoinRoomFormData>({
    resolver: zodResolver(joinRoomValidationSchema),
    mode: 'all',
    defaultValues: {
      // If roomId is provided include it as default form value
      roomId: searchParams.get('roomId') ?? undefined,
    },
  });

  return (
    <FormProvider {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="roomId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input placeholder="3DA243K" {...field} />
              </FormControl>
              <FormDescription>Room ID</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormDescription>Room Password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Funny Guy" {...field} />
              </FormControl>
              <FormDescription>Your username</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button aria-label="Join Room" type="submit" className="w-full" icon={isPending && <LoadingIcon />}>
          Join Room
        </Button>
      </form>
    </FormProvider>
  );
};

export default JoinRoomForm;
