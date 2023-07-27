'use client';

import React from 'react';
import { Button, Form, buttonVariants } from '@doodle-together/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { joinRoomValidationSchema } from '../lib/room.validations';
import { z } from 'zod';
import { FormField } from '@doodle-together/ui';
import { FormItem, FormLabel, FormControl, Input, FormDescription, FormMessage } from '@doodle-together/ui';
import Link from 'next/link';

export type JoinRoomFormData = z.infer<typeof joinRoomValidationSchema>;

type JoinRoomFormProps = {
  onSubmit: (data: JoinRoomFormData) => void;
};

const JoinRoomForm: React.FC<JoinRoomFormProps> = (props) => {
  const { onSubmit } = props;

  const form = useForm({
    resolver: zodResolver(joinRoomValidationSchema),
  });

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="roomId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Room ID</FormLabel>
              <FormControl>
                <Input placeholder="3DA243K" {...field} />
              </FormControl>
              <FormDescription>Room to Join</FormDescription>
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
                <Input placeholder="FunnyGuy" {...field} />
              </FormControl>
              <FormDescription>Your username</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Join Room
        </Button>
      </form>
    </Form>
  );
};

export default JoinRoomForm;
