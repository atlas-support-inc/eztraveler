import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export function MyBookingsPage() {
  const bookings = useQuery(api.bookings.queries.listMyBookings);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      <div className="space-y-4">
        {bookings && bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking._id} className="p-4 border rounded-lg bg-background">
              <h3 className="text-xl font-bold">{booking.hotelName}</h3>
              <p>
                {booking.checkIn} to {booking.checkOut}
              </p>
              <p>Status: {booking.status}</p>
            </div>
          ))
        ) : (
          <p>You have no upcoming bookings.</p>
        )}
      </div>
    </div>
  );
}