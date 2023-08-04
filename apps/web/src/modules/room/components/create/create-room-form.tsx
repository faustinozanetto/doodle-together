'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

import { createRoomValidationSchema } from '@modules/room/lib/room.validations';
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

export type CreateRoomFormData = z.infer<typeof createRoomValidationSchema>;

type CreateRoomFormProps = {
  isPending: boolean;
  onSubmit: (data: CreateRoomFormData) => void;
};

const CreateRoomForm: React.FC<CreateRoomFormProps> = (props) => {
  const { onSubmit, isPending } = props;

  const form = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomValidationSchema),
    mode: 'all',
  });

  return (
    <FormProvider {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="3DA243K" {...field} />
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

        <Button aria-label="Create Room" type="submit" className="w-full" icon={isPending && <LoadingIcon />}>
          Create Room
        </Button>
      </form>
    </FormProvider>
  );
};

export default CreateRoomForm;
