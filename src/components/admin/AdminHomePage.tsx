import { CreateHotelForm } from "./CreateHotelForm";

export function AdminHomePage() {
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
          {/* We will list existing hotels here in the future */}
        </div>
      </div>
    </div>
  );
}