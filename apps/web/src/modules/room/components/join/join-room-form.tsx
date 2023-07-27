'use client';

import React from 'react';
import { Form, useForm } from 'react-hook-form';
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
          name="id"
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
                <Input placeholder="3DA243K" {...field} />
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

        <Button type="submit" className="w-full">
          Join Room
        </Button>
      </form>
    </Form>
  );
};

export default JoinRoomForm;
