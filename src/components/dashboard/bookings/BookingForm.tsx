import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"

interface BookingFormProps {
  hotelId: Id<"hotels">;
}

export function BookingForm({ hotelId }: BookingFormProps) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);
  const createBooking = useMutation(api.bookings.mutations.createBooking)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBooking({
        hotelId,
        checkIn,
        checkOut,
        guests,
        rooms,
      });
      toast.success("Booking Successful!",{
        description: "Your hotel has been booked.",
      });
    } catch (error) {
      console.error(error);
      toast.error("Booking Failed", {
        description: "There was an error creating your booking.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="checkIn">Check-in Date</Label>
        <Input
          id="checkIn"
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="checkOut">Check-out Date</Label>
        <Input
          id="checkOut"
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="guests">Guests</Label>
        <Input
          id="guests"
          type="number"
          min="1"
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value))}
          required
        />
      </div>
      <div>
        <Label htmlFor="rooms">Rooms</Label>
        <Input
          id="rooms"
          type="number"
          min="1"
          value={rooms}
          onChange={(e) => setRooms(parseInt(e.target.value))}
          required
        />
      </div>
      <Button type="submit">Book Now</Button>
    </form>
  );
}