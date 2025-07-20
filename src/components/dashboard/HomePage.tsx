import { useState } from "react";
import { useAuth } from "@/hooks/auth/useAuth";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { BookingForm } from "./bookings/BookingForm";
import { Button } from "@/components/ui/button";

export function HomePage() {
  const { user } = useAuth();
  const hotels = useQuery(api.hotels.queries.listHotels);
  const bookings = useQuery(api.bookings.queries.listMyBookings);
  const [selectedHotel, setSelectedHotel] = useState<Id<"hotels"> | null>(null);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        Welcome, {user?.name}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Available Hotels</h2>
          <div className="space-y-4">
            {hotels ? (
              hotels.map((hotel) => (
                <div key={hotel._id} className="p-4 border rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold">{hotel.name}</h3>
                  <p className="text-gray-600">{hotel.location}</p>
                  <p className="mt-2">{hotel.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-semibold">
                      ${hotel.pricePerNight}/night
                    </span>
                    {selectedHotel !== hotel._id && (
                      <Button onClick={() => setSelectedHotel(hotel._id)}>
                        Book Now
                      </Button>
                    )}
                  </div>
                  {selectedHotel === hotel._id && (
                    <div className="mt-4">
                      <BookingForm hotelId={hotel._id} />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>Loading hotels...</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
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
      </div>
    </div>
  );
}