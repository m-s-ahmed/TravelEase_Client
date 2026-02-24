import React from "react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../Card/Card";

const AllVehicles = () => {
  const API = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState("");

  // filters
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // build query string
  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (location) params.set("location", location);
    if (sort) params.set("sort", sort);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    return params.toString();
  }, [category, location, sort, minPrice, maxPrice]);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const url = `${API}/api/vehicles${queryString ? `?${queryString}` : ""}`;
        const res = await fetch(url);

        if (!res.ok) throw new Error("Failed to load vehicles");
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
  }, [API, queryString]);

  const clearFilters = () => {
    setCategory("");
    setLocation("");
    setSort("newest");
    setMinPrice("");
    setMaxPrice("");
  };
  return (
    
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-3xl font-bold">All Vehicles</h2>

        <button onClick={clearFilters} className="btn btn-outline btn-sm w-fit">
          Clear Filters
        </button>
      </div>

      {/* Filters */}
      <div className="bg-base-200 rounded-2xl p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Category */}
          <div>
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Electric">Electric</option>
              <option value="Van">Van</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input
              className="input input-bordered w-full"
              placeholder="e.g. Dhaka"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Min Price */}
          <div>
            <label className="label">
              <span className="label-text">Min Price</span>
            </label>
            <input
              className="input input-bordered w-full"
              type="number"
              min="0"
              placeholder="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>

          {/* Max Price */}
          <div>
            <label className="label">
              <span className="label-text">Max Price</span>
            </label>
            <input
              className="input input-bordered w-full"
              type="number"
              min="0"
              placeholder="999"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          {/* Sort */}
          <div>
            <label className="label">
              <span className="label-text">Sort</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* States */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && vehicles.length === 0 && (
        <p>No vehicles found for this filter.</p>
      )}

      {/* Grid */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((v) => (
          <div key={v._id} className="card bg-base-100 shadow-xl">
            <figure className="h-48">
              <img
                className="w-full h-full object-cover"
                src={v.coverImage || "https://via.placeholder.com/600x400"}
                alt={v.vehicleName}
              />
            </figure>

            <div className="card-body">
              <h3 className="card-title">{v.vehicleName}</h3>

              <div className="flex flex-wrap gap-2 text-sm opacity-80">
                <span className="badge badge-outline">{v.category}</span>
                <span className="badge badge-outline">{v.location}</span>
                <span className="badge badge-outline">
                  {v.availability || "Available"}
                </span>
              </div>

              <p className="font-semibold mt-2">${v.pricePerDay}/day</p>

              <div className="card-actions justify-end mt-3">
                <Link to={`/vehicles/${v._id}`} className="btn btn-outline">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllVehicles;
