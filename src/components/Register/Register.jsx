import { use, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, signInWithGoogle } = use(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  //   For password validation
  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (!/[A-Z]/.test(password)) {
      return "Must contain one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Must contain one lowercase letter";
    }
    return "";
  };
  // For handle register button
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    const passwordError = validatePassword(password);

    if (passwordError) {
      setError(passwordError);
      return;
    }

    setError("");

    try {
      const result = await createUser(email, password);
      console.log(result);
      // Firebase save only name and password.
      //So,we manually add displayName and photoURL same as the form.
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });

      toast.success("Registration Successful");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success("Google Login Successful");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100 p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Register on TravelEase
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered w-full"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />

          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            className="input input-bordered w-full"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button className="btn btn-primary w-full">Register</button>
        </form>

        <div className="divider">OR</div>

        <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
          Continue with Google
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
