import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import carbanner from "../../assets/carbanner.jpg";
import { motion } from "framer-motion";

const Home = () => {
  const API = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API}/api/vehicles/latest`);
        if (!res.ok) throw new Error("Failed to load latest vehicles");

        const data = await res.json();

        if (!ignore) setVehicles(data);
      } catch (e) {
        if (!ignore) setError(e.message || "Something went wrong");
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, [API]);

  return (
    <div>
      {/* Banner */}
      <section
        className="hero relative overflow-hidden bg-cover bg-center
             min-h-[60vh] sm:min-h-[70vh] lg:min-h-[85vh]"
        style={{
          backgroundImage: `url(${carbanner})`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/55 sm:bg-black/50"></div>

        <div className="hero-content relative z-10 text-center text-white px-4 w-full">
          <div className="max-w-3xl">
            {/* <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg leading-tight">
              TravelEase
            </h1>

            <p className="text-base sm:text-lg md:text-xl opacity-90">
              Book your perfect vehicle anytime, anywhere.
            </p> */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 3 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                TravelEase
              </h1>
              <p className="py-4 text-lg md:text-xl opacity-90">
                Book your perfect vehicle anytime, anywhere.
              </p>
            </motion.div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/all-vehicles" className="btn btn-primary px-8">
                All Vehicles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Vehicles */}
      <section className="px-4 py-10 max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-3xl font-bold">Latest Vehicles</h2>
          <Link className="btn btn-outline" to="/all-vehicles">
            See all
          </Link>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && vehicles.length === 0 && (
          <p>No vehicles found. Add a vehicle first.</p>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {vehicles.map((v) => (
            <div key={v._id} className="card bg-base-100 shadow-xl">
              <figure className="h-48">
                <img
                  className="w-full h-full object-cover"
                  src={
                    v.coverImage ||
                    "https://toyota-bd.com/wp-content/uploads/2025/06/0K8A71742.jpg"
                  }
                  alt={v.vehicleName}
                />
              </figure>

              <div className="card-body">
                <h3 className="card-title">{v.vehicleName}</h3>
                <p className="text-sm opacity-80">{v.location}</p>
                <p className="font-semibold">${v.pricePerDay}/day</p>

                <div className="card-actions justify-end mt-2">
                  <Link to={`/vehicles/${v._id}`} className="btn btn-outline">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Static section 1 */}
      <section className="bg-base-200 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Top Categories</h2>
          <div className="flex flex-wrap gap-3">
            <div className="badge badge-lg">SUV</div>
            <div className="badge badge-lg">Electric</div>
            <div className="badge badge-lg">Van</div>
            <div className="badge badge-lg">Sedan</div>
          </div>
        </div>
      </section>

      {/* Static section 2 */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-3">About TravelEase</h2>
          <p className="opacity-80">
            TravelEase makes vehicle booking simple and reliable. Pick a vehicle
            you like, view details, and book instantly.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
