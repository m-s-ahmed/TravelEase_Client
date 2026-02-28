import React, { useEffect, useState } from "react";
import useAuth from "../../contexts/useAuth";

const MyBookings = () => {
  const API = import.meta.env.VITE_API_URL;
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      setLoading(true);
      const res = await fetch(
        `${API}/api/bookings?userEmail=${encodeURIComponent(user?.email || "")}`,
      );
      const data = await res.json();
      if (!ignore) setBookings(data);
      if (!ignore) setLoading(false);
    };

    if (user?.email) load();
    return () => (ignore = true);
  }, [API, user?.email]);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">My Bookings</h2>

      {bookings.length === 0 && <p>No bookings yet.</p>}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((b) => (
          <div key={b._id} className="card bg-base-100 shadow-xl">
            <figure className="h-48">
              <img
                className="w-full h-full object-cover"
                src={b.coverImage}
                alt={b.vehicleName}
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{b.vehicleName}</h3>
              <p className="opacity-80">{b.location}</p>
              <p className="font-semibold">${b.pricePerDay}/day</p>
              <p className="text-sm opacity-70">
                Status: {b.status || "Pending"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
