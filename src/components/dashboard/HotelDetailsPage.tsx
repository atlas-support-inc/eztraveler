import { useParams } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { BookingForm } from "./bookings/BookingForm";

export function HotelDetailsPage() {
  const { hotelId } = useParams<{ hotelId: Id<"hotels"> }>();

  const hotel = useQuery(
    api.hotels.queries.getHotel,
    hotelId ? { hotelId } : "skip"
  );

  if (hotel === undefined) {
    return <div className="p-8 text-center text-muted-foreground">Loading hotel details...</div>;
  }

  if (hotel === null) {
    return <div className="p-8 text-center text-destructive">Hotel not found.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-foreground">{hotel.name}</h1>
      <p className="text-lg text-muted-foreground mb-8">{hotel.location}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={hotel.imageUrls?.[0] ?? "/placeholder.svg"}
            alt={hotel.name}
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
          <div className="mt-4">
            <h2 className="text-2xl font-semibold mb-2 text-foreground">About this hotel</h2>
            <p className="text-muted-foreground">{hotel.description}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2 text-foreground">Amenities</h3>
            <ul className="list-disc list-inside text-muted-foreground">
              {hotel.amenities.map((amenity) => (
                <li key={amenity}>{amenity}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <div className="sticky top-8">
            <div className="p-6 border rounded-lg shadow-lg bg-card text-card-foreground">
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-primary">
                  ${hotel.pricePerNight}
                </span>
                <span className="text-muted-foreground">/night</span>
              </div>
              <BookingForm hotelId={hotel._id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}