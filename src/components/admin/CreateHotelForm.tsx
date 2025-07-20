import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button, Input, Label, Alert, AlertDescription } from "@/components/ui";
import { Loader2 } from "lucide-react";

export function CreateHotelForm() {
  const createHotel = useMutation(api.hotels.mutations.createHotel);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [imageUrls, setImageUrls] = useState("");
  const [amenities, setAmenities] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await createHotel({
        name,
        description,
        location,
        pricePerNight: parseFloat(pricePerNight),
        imageUrls: imageUrls.split(",").map((url) => url.trim()),
        amenities: amenities.split(",").map((amenity) => amenity.trim()),
      });
      setSuccess("Hotel created successfully!");
      // Reset form
      setName("");
      setDescription("");
      setLocation("");
      setPricePerNight("");
      setImageUrls("");
      setAmenities("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create hotel");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert variant="default">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <Label htmlFor="name">Hotel Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="pricePerNight">Price per Night</Label>
        <Input
          id="pricePerNight"
          type="number"
          value={pricePerNight}
          onChange={(e) => setPricePerNight(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="imageUrls">Image URLs (comma-separated)</Label>
        <Input
          id="imageUrls"
          value={imageUrls}
          onChange={(e) => setImageUrls(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="amenities">Amenities (comma-separated)</Label>
        <Input
          id="amenities"
          value={amenities}
          onChange={(e) => setAmenities(e.target.value)}
          required
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating...
          </>
        ) : (
          "Create Hotel"
        )}
      </Button>
    </form>
  );
}