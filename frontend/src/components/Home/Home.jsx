import React, { useContext, useEffect } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";

import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";

const Home = () => {
  const { isAuthorized } = useContext(Context);

  // 🔹 Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 🔹 Redirect if not logged in
  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="homePage page">
      {/* 🔥 Hero Section */}
      <HeroSection />

      {/* ⚡ How It Works */}
      <HowItWorks />

      {/* 📂 Categories */}
      <PopularCategories />

      {/* 🏢 Companies */}
      <PopularCompanies />
    </main>
  );
};

export default Home;
