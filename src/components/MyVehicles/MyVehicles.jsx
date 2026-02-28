import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../contexts/useAuth";

const MyVehicles = () => {
  const API = import.meta.env.VITE_API_URL;
  const { user, loading: authLoading } = useAuth();

  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState([]);

  const load = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${API}/api/vehicles/my?userEmail=${encodeURIComponent(user.email)}`,
      );

      if (!res.ok) throw new Error("Failed to load my vehicles");

      const data = await res.json();
      setVehicles(data);
    } catch (e) {
      toast.error(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user?.email) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, user?.email]);

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this vehicle?");
    if (!ok) return;

    try {
      const res = await fetch(`${API}/api/vehicles/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      toast.success("Deleted successfully!");
      setVehicles((prev) => prev.filter((v) => v._id !== id));
    } catch (e) {
      toast.error(e.message || "Something went wrong");
    }
  };

  if (authLoading) return <p className="p-6">Auth Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">My Vehicles</h2>

      {loading && <p>Loading...</p>}

      {!loading && vehicles.length === 0 && <p>No vehicles added yet.</p>}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((v) => (
          <div key={v._id} className="card bg-base-100 shadow-xl">
            <figure className="h-48">
              <img
                className="w-full h-full object-cover"
                src={v.coverImage}
                alt={v.vehicleName}
              />
            </figure>

            <div className="card-body">
              <h3 className="card-title">{v.vehicleName}</h3>
              <p className="font-semibold">${v.pricePerDay}/day</p>

              <div className="card-actions justify-end">
                <Link
                  to={`/vehicles/${v._id}`}
                  className="btn btn-outline btn-sm"
                >
                  View Details
                </Link>
                <Link
                  to={`/update-vehicle/${v._id}`}
                  className="btn btn-secondary btn-sm"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(v._id)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyVehicles;
