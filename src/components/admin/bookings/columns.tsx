"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { EditBookingModal } from "./EditBookingModal";

type Booking = {
  _id: Id<"bookings">;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  totalAmount: number;
  status: string;
  userEmail: string;
  userName: string;
};

const CancelBookingButton = ({
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

export const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "userName",
    header: "Customer",
  },
  {
    accessorKey: "userEmail",
    header: "Email",
  },
  {
    accessorKey: "hotelName",
    header: "Hotel",
  },
  {
    accessorKey: "checkIn",
    header: "Check-in",
  },
  {
    accessorKey: "checkOut",
    header: "Check-out",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "totalAmount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const booking = row.original;
      return (
        <div className="flex gap-2">
          <EditBookingModal
            bookingId={booking._id}
            checkIn={booking.checkIn}
            checkOut={booking.checkOut}
          />
          <CancelBookingButton bookingId={booking._id} status={booking.status} />
        </div>
      );
    },
  },
];