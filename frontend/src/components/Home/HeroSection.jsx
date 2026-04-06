import React, { useEffect, useState } from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const [animate, setAnimate] = useState(false);

  // 🔹 Trigger animation on mount
  useEffect(() => {
    setAnimate(true);
  }, []);

  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Jobs",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91,220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];

  return (
    <section className={`heroSection ${animate ? "fade-in" : ""}`}>
      {/* Top Section */}
      <div className="container">
        {/* Left Content */}
        <div className="title">
          <h1>
            Find a job that <span className="highlight">fits you</span>
          </h1>
          <h1>and your skills</h1>

          <p>
            Discover opportunities tailored to your passion. Connect with top
            companies and build a career you love 🚀
          </p>

          {/* CTA Button */}
          <button className="hero-btn">Get Started</button>
        </div>

        {/* Right Image */}
        <div className="image">
          <img src="/heroS.jpg" alt="hero" />
        </div>
      </div>

      {/* Stats Section */}
      <div className="details">
        {details.map((item, index) => (
          <div
            className="card"
            key={item.id}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="icon">{item.icon}</div>
            <div className="content">
              <p className="number">{item.title}</p>
              <p className="label">{item.subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
