import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../contexts/useAuth";

const VehiclesDetails = () => {
  const API = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API}/api/vehicles/${id}`);
        if (!res.ok) throw new Error("Failed to load vehicle details");
        const data = await res.json();

        if (!ignore) setVehicle(data);
      } catch (e) {
        if (!ignore) setError(e.message || "Something went wrong");
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();
    return () => (ignore = true);
  }, [API, id]);

  const handleBookNow = async () => {
    try {
      if (!vehicle) return;

      // booking data and store in DB
      const bookingPayload = {
        vehicleId: vehicle._id,
        vehicleName: vehicle.vehicleName,
        category: vehicle.category,
        pricePerDay: vehicle.pricePerDay,
        location: vehicle.location,
        coverImage: vehicle.coverImage,
        owner: vehicle.owner,

        userEmail: user?.email, // who booked
        userName: user?.displayName || "User",
      };

      const res = await fetch(`${API}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });

      if (!res.ok) throw new Error("Booking failed");

      alert("Booking request saved!");
    } catch (e) {
      alert(e.message || "Something went wrong");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!vehicle) return <p className="p-6">Vehicle not found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img
            className="w-full h-[360px] md:h-[480px] object-cover"
            src={vehicle.coverImage || "https://via.placeholder.com/1200x800"}
            alt={vehicle.vehicleName}
          />
        </div>

        {/* Details */}
        <div className="bg-base-200 rounded-2xl p-6 shadow">
          <h2 className="text-3xl font-bold">{vehicle.vehicleName}</h2>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="badge badge-outline">{vehicle.category}</span>
            <span className="badge badge-outline">{vehicle.location}</span>
            <span className="badge badge-outline">
              {vehicle.availability || "Available"}
            </span>
          </div>

          <p className="mt-4 text-lg">
            <span className="font-semibold">Price:</span> ${vehicle.pricePerDay}
            /day
          </p>

          <p className="mt-2">
            <span className="font-semibold">Owner:</span> {vehicle.owner}
          </p>

          <div className="mt-5">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="opacity-80">
              {vehicle.description || "No description added."}
            </p>
          </div>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <button onClick={handleBookNow} className="btn btn-primary">
              Book Now / Request Ride
            </button>

            <button
              className="btn btn-outline"
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
          </div>

          <p className="mt-4 text-sm opacity-70">
            Booking will be saved in database (no payment needed).
          </p>
        </div>
      </div>
    </div>
  );
};

export default VehiclesDetails;
