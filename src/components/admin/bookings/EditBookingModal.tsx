"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type EditBookingModalProps = {
  bookingId: Id<"bookings">;
  checkIn: string;
  checkOut: string;
};

export function EditBookingModal({
  bookingId,
  checkIn,
  checkOut,
}: EditBookingModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newCheckIn, setNewCheckIn] = useState(checkIn);
  const [newCheckOut, setNewCheckOut] = useState(checkOut);
  const updateBookingDetails = useMutation(
    api.bookings.mutations.updateBookingDetails
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBookingDetails({
        bookingId,
        checkIn: newCheckIn,
        checkOut: newCheckOut,
      });
      toast.success("Booking updated successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to update booking");
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Booking</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="checkIn" className="text-right">
              Check-in
            </Label>
            <Input
              id="checkIn"
              type="date"
              value={newCheckIn}
              onChange={(e) => setNewCheckIn(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="checkOut" className="text-right">
              Check-out
            </Label>
            <Input
              id="checkOut"
              type="date"
              value={newCheckOut}
              onChange={(e) => setNewCheckOut(e.target.value)}
              className="col-span-3"
            />
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}