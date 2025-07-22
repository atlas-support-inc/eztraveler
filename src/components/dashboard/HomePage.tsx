import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";

export function HomePage() {
  const { user } = useAuth();
  const hotels = useQuery(api.hotels.queries.listHotels);

  return (
    <div className="p-1">
      <h1 className="text-3xl font-bold mb-8">
        Welcome, {user?.name}!
      </h1>

      <div>
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
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-semibold">
                      ${hotel.pricePerNight}
                      <span className="text-sm text-muted-foreground">/night</span>
                    </span>
                    <Button asChild>
                      <Link to={`/dashboard/hotel/${hotel._id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Loading hotels...</p>
        )}
      </div>
    </div>
  );
}