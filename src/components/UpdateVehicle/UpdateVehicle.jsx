import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const UpdateVehicle = () => {
  const API = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(null);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/api/vehicles/${id}`);
        const data = await res.json();
        if (!ignore) setForm(data);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();
    return () => (ignore = true);
  }, [API, id]);

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        pricePerDay: Number(form.pricePerDay),
      };

      const res = await fetch(`${API}/api/vehicles/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Update failed");
      toast.success("Updated successfully!");
      navigate("/myvehicles");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!form) return <p className="p-6">Vehicle not found.</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Update Vehicle</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-base-200 p-6 rounded-2xl space-y-4"
      >
        <input
          className="input input-bordered w-full"
          name="vehicleName"
          value={form.vehicleName || ""}
          onChange={onChange}
        />
        <input
          className="input input-bordered w-full"
          name="owner"
          value={form.owner || ""}
          onChange={onChange}
        />

        <div className="grid md:grid-cols-2 gap-4">
          <select
            className="select select-bordered w-full"
            name="category"
            value={form.category || "Sedan"}
            onChange={onChange}
          >
            <option>Sedan</option>
            <option>SUV</option>
            <option>Electric</option>
            <option>Van</option>
            <option>Sports</option>
          </select>

          <input
            className="input input-bordered w-full"
            name="pricePerDay"
            type="number"
            min="0"
            value={form.pricePerDay ?? ""}
            onChange={onChange}
          />
        </div>

        <input
          className="input input-bordered w-full"
          name="location"
          value={form.location || ""}
          onChange={onChange}
        />

        <select
          className="select select-bordered w-full"
          name="availability"
          value={form.availability || "Available"}
          onChange={onChange}
        >
          <option>Available</option>
          <option>Booked</option>
        </select>

        <textarea
          className="textarea textarea-bordered w-full"
          name="description"
          value={form.description || ""}
          onChange={onChange}
        />
        <input
          className="input input-bordered w-full"
          name="coverImage"
          value={form.coverImage || ""}
          onChange={onChange}
        />

        <button className="btn btn-primary w-full">Save Changes</button>
      </form>
    </div>
  );
};

export default UpdateVehicle;
