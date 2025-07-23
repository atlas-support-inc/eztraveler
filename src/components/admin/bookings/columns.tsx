"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Id } from "../../../../convex/_generated/dataModel";
import { EditBookingModal } from "./EditBookingModal";
import { CancelBookingButton } from "./CancelBookingButton";

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