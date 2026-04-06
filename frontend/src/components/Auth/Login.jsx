import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Form Validation
  const validateForm = () => {
    if (!formData.role) {
      toast.error("Please select a role");
      return false;
    }
    if (!formData.email.includes("@")) {
      toast.error("Enter a valid email");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  // 🔹 Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      toast.success(data.message || "Login successful");

      // Reset form
      setFormData({
        email: "",
        password: "",
        role: "",
      });

      setIsAuthorized(true);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Redirect if already logged in
  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <section className="authPage">
      <div className="container">
        {/* Header */}
        <div className="header">
          <img src="/careerconnect-black.png" alt="logo" />
          <h3>Login to your account</h3>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin}>
          {/* Role */}
          <div className="inputTag">
            <label>Login As</label>
            <div>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Select Role</option>
                <option value="Job Seeker">Job Seeker</option>
                <option value="Employer">Employer</option>
              </select>
              <FaRegUser />
            </div>
          </div>

          {/* Email */}
          <div className="inputTag">
            <label>Email Address</label>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
              <MdOutlineMailOutline />
            </div>
          </div>

          {/* Password */}
          <div className="inputTag">
            <label>Password</label>
            <div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your Password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />

              <button
                type="button"
                className="eye-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </button>
            </div>
          </div>

          {/* Button */}
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Register Link */}
          <Link to="/register">Register Now</Link>
        </form>
      </div>

      {/* Right Side Banner */}
      <div className="banner">
        <img src="/login.png" alt="login" />
      </div>
    </section>
  );
};

export default Login;
