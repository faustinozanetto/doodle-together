'use client';

import React from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { deleteRoomValidationSchema } from '@modules/room/lib/room.validations';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@modules/ui/components/forms/forms';
import { Input } from '@modules/ui/components/forms/input';
import { AlertDialogCancel, AlertDialogFooter } from '@modules/ui/components/alert-dialog/alert-dialog';
import { z } from 'zod';
import { Button } from '@modules/ui/components/button/button';

export type DeleteRoomFormData = z.infer<typeof deleteRoomValidationSchema>;

type RoomManagementDeleteFormProps = {
  onSubmit: (data: DeleteRoomFormData) => void;
};

const RoomManagementDeleteForm: React.FC<RoomManagementDeleteFormProps> = (props) => {
  const { onSubmit } = props;

  const form = useForm({
    resolver: zodResolver(deleteRoomValidationSchema),
    mode: 'all',
  });

  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="roomId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Room ID</FormLabel>
              <FormControl>
                <Input placeholder="3DA243K" {...field} />
              </FormControl>
              <FormDescription>Current room id</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button type="submit" variant="danger-solid">
            Delete
          </Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
};

export default RoomManagementDeleteForm;
