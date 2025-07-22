import { CreateHotelForm } from "./CreateHotelForm";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function AdminHomePage() {
  const hotels = useQuery(api.hotels.queries.listHotels);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Create a New Hotel</h2>
          <CreateHotelForm />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Existing Hotels</h2>
          {hotels ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hotels.map((hotel) => (
                <div
                  key={hotel._id}
                  className="border rounded-lg shadow-sm overflow-hidden hover-lift"
                >
                  <img
                    src={hotel.imageUrls[0] ?? "/placeholder.svg"}
                    alt={hotel.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold">{hotel.name}</h3>
                    <p className="text-muted-foreground">{hotel.location}</p>
                    <p className="mt-2 text-sm text-muted-foreground truncate">
                      {hotel.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Loading hotels...</p>
          )}
        </div>
      </div>
    </div>
  );
}