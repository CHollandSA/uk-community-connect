import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import VolunteerInfo from "../components/VolunteerInfo";
import CitizenshipTestSection from "../components/CitizenshipTestSection";
import Extra from "../components/Extra";
import Footer from "../components/Footer";
import Booking from "../components/Booking";
import Organization from "../components/Organization";
import Admin from "../components/Admin";
import "../components/App.css";

const Home = () => {
  const isOrganization = localStorage.getItem("organization") === "1";
  const isLoggedIn = localStorage.getItem("username") !== null;
  const isAdmin = localStorage.getItem("username") === "admin";

  return (
    <div
      style={{
        backgroundImage: "url(./images/011-subtle-light-patterns.jpg)",
        fontFamily: "Arial",
      }}
    >
      <Header />
      {isAdmin && <Admin />}
      {!isAdmin && <HeroSection />}
      {!isAdmin && <CitizenshipTestSection />}
      {isOrganization && <Organization />}
      {!isAdmin && isLoggedIn && <VolunteerInfo />}
      {!isAdmin && <Booking />}
      {!isAdmin && <Extra />}
      <Footer />
    </div>
  );
};

export default Home;
