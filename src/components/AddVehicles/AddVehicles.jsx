import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../contexts/useAuth";

const AddVehicles = () => {
  const API = import.meta.env.VITE_API_URL;
  const { user } = useAuth();

  const [form, setForm] = useState({
    vehicleName: "",
    owner: "",
    category: "Sedan",
    pricePerDay: "",
    location: "",
    availability: "Available",
    description: "",
    coverImage: "",
  });

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      pricePerDay: Number(form.pricePerDay),
      userEmail: user?.email, // auto
    };

    try {
      const res = await fetch(`${API}/api/vehicles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to add vehicle");
      toast.success("Vehicle added successfully!");
      e.target.reset();
      setForm((p) => ({ ...p, pricePerDay: "" }));
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Add Vehicle</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-base-200 p-6 rounded-2xl space-y-4"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="input input-bordered w-full"
            name="vehicleName"
            placeholder="Vehicle Name"
            onChange={onChange}
            required
          />
          <input
            className="input input-bordered w-full"
            name="owner"
            placeholder="Owner Name"
            onChange={onChange}
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <select
            className="select select-bordered w-full"
            name="category"
            onChange={onChange}
            value={form.category}
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
            placeholder="Price Per Day"
            value={form.pricePerDay}
            onChange={onChange}
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="input input-bordered w-full"
            name="location"
            placeholder="Location"
            onChange={onChange}
            required
          />
          <select
            className="select select-bordered w-full"
            name="availability"
            onChange={onChange}
            value={form.availability}
          >
            <option>Available</option>
            <option>Booked</option>
          </select>
        </div>

        <textarea
          className="textarea textarea-bordered w-full"
          name="description"
          placeholder="Description"
          onChange={onChange}
        />

        <input
          className="input input-bordered w-full"
          name="coverImage"
          placeholder="Cover Image URL"
          onChange={onChange}
        />

        <input
          className="input input-bordered w-full"
          value={user?.email || ""}
          readOnly
          placeholder="User Email (auto)"
        />

        <button className="btn btn-primary w-full">Submit</button>
      </form>
    </div>
  );
};

export default AddVehicles;
