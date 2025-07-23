"use client";

import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const CancelBookingButton = ({
  bookingId,
  status,
}: {
  bookingId: Id<"bookings">;
  status: string;
}) => {
  const cancelBooking = useMutation(api.bookings.mutations.cancelBooking);

  const handleCancel = async () => {
    try {
      await cancelBooking({ bookingId });
      toast.success("Booking cancelled successfully");
    } catch (error) {
      toast.error("Failed to cancel booking");
      console.error(error);
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleCancel}
      disabled={status === "cancelled"}
    >
      Cancel
    </Button>
  );
};