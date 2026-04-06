import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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

  // 🔹 Validation
  const validateForm = () => {
    const { name, email, phone, password, role } = formData;

    if (!role) {
      toast.error("Please select a role");
      return false;
    }

    if (name.trim().length < 3) {
      toast.error("Name must be at least 3 characters");
      return false;
    }

    if (!email.includes("@")) {
      toast.error("Enter a valid email");
      return false;
    }

    if (phone.length < 10) {
      toast.error("Enter a valid phone number");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  // 🔹 Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      toast.success(data.message || "Registered successfully");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
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
          <h3>Create a new account</h3>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister}>
          {/* Role */}
          <div className="inputTag">
            <label>Register As</label>
            <div>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              <FaRegUser />
            </div>
          </div>

          {/* Name */}
          <div className="inputTag">
            <label>Name</label>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
              />
              <FaPencilAlt />
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

          {/* Phone */}
          <div className="inputTag">
            <label>Phone Number</label>
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={loading}
              />
              <FaPhoneFlip />
            </div>
          </div>

          {/* Password */}
          <div className="inputTag">
            <label>Password</label>
            <div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
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

          {/* Submit */}
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Login Link */}
          <Link to="/login">Login Now</Link>
        </form>
      </div>

      {/* Banner */}
      <div className="banner">
        <img src="/register.png" alt="register" />
      </div>
    </section>
  );
};

export default Register;
