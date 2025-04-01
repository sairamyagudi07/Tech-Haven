import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaUser } from "react-icons/fa";

const Auth = () => {
  const { setUserRole } = useAppContext();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setIsForgotPassword(false);
    setErrors({});
  };

  const toggleForgotPassword = () => {
    setIsForgotPassword(true);
    setErrors({});
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (isSignup && !formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!isForgotPassword) {
      if (!formData.password.trim()) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters long";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuth = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (isForgotPassword) {
      alert("Password reset link sent to your email.");
      return;
    }
    if (isSignup) {
      alert("Account created successfully! Please login.");
      setIsSignup(false);
      return;
    }
    if (formData.email === "admin@techhaven.com") {
      localStorage.setItem("userRole", "admin");
      setUserRole("admin");
      navigate("/admin");
    } else {
      localStorage.setItem("userRole", "user");
      setUserRole("user");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isForgotPassword ? "Reset Password" : isSignup ? "Sign Up" : "Login"}
        </h2>
        <form onSubmit={handleAuth} className="space-y-4">
          {isSignup && (
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full pl-10 p-2 border rounded focus:ring focus:ring-blue-300"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>
          )}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-10 p-2 border rounded focus:ring focus:ring-blue-300"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          {!isForgotPassword && (
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 p-2 border rounded focus:ring focus:ring-blue-300"
              />
              {showPassword ? (
                <FaEyeSlash
                  className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaEye
                  className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
          >
            {isForgotPassword ? "Send Reset Link" : isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        {/* Forgot Password link */}
        {!isForgotPassword && !isSignup && (
          <p
            className="text-center text-blue-500 cursor-pointer mt-2"
            onClick={toggleForgotPassword}
          >
            Forgot Password?
          </p>
        )}
        
        <p className="text-center text-gray-600 mt-4">
          {isSignup ? "Already have an account? " : "Don't have an account? "}
          <span className="text-blue-500 cursor-pointer" onClick={toggleForm}>
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>

        {/* Added Terms and Conditions Link */}
        {!isForgotPassword && !isSignup && (
          <p className="text-center text-sm text-gray-600 mt-4">
            By continuing, you agree to our{" "}
            <span className="text-blue-500 cursor-pointer">Terms and Conditions</span> and
            <span className="text-blue-500 cursor-pointer"> Privacy Policy</span>.
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;
