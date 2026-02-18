import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  // for redirect to desired route
  const from = location.state?.from?.pathname || "/";

  const [error, setError] = useState("");

  // Email Password Login
  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setError("");

    signInUser(email, password)
      .then(() => {
        toast.success("Login Successful");

        // redirect
        navigate(from);
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      });
  };

  // Google Login
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Google Login Successful");

        navigate(from);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Login into TravelEase
        </h2>

        {/* Login Form */}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />

          {/* Password */}

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />

          {/* Forget Password */}

          <div className="text-right">
            <Link to="/forget-password" className="text-sm text-primary">
              Forget Password?
            </Link>
          </div>

          {/* Error */}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Login Button */}

          <button className="btn btn-primary w-full">Login</button>
        </form>

        {/* Divider */}

        <div className="divider">OR</div>

        {/* Google Login */}

        <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
          Continue with Google
        </button>

        {/* Register Link */}

        <p className="text-center mt-4">
          New here?
          <Link to="/register" className="text-primary ml-1">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
