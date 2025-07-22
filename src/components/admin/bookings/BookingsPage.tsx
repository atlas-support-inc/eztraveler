import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Input } from "@/components/ui/input";
import { BookingDataTable } from "./BookingDataTable";
import { columns } from "./columns";

export function BookingsPage() {
  const [searchText, setSearchText] = useState("");

  const bookings = useQuery(api.bookings.queries.listAll, {
    search: searchText,
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Manage Bookings</h1>
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search by customer or hotel name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <BookingDataTable columns={columns} data={bookings || []} />
    </div>
  );
}