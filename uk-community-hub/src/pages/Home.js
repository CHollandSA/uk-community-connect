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
  // Retrieve organization status, login status, and admin status from localStorage
  const isOrganization = localStorage.getItem("organization") === "1";
  const isLoggedIn = localStorage.getItem("username") !== null;
  const isAdmin = localStorage.getItem("username") === "admin";

  return (
    <div
      style={{
        backgroundImage: "url(./images/011-subtle-light-patterns.jpg)",
        fontFamily: "Poppins, sans-serif", //"Roboto, sans-serif
      }}
    >
      {/* Render the Header component */}
      <Header />

      {/* Render the Admin component if the user is an admin */}
      {isAdmin && <Admin />}

      {/* Render the HeroSection component if the user is not an admin */}
      {!isAdmin && <HeroSection />}

      {/* Render the CitizenshipTestSection component if the user is not an admin */}
      {!isAdmin && <CitizenshipTestSection />}

      {/* Render the Organization component if the user is an organization */}
      {!isAdmin && isOrganization && <Organization />}

      {/* Render the VolunteerInfo component if the user is logged in and not an admin */}
      {!isAdmin && isLoggedIn && <VolunteerInfo />}

      {/* Render the Booking component if the user is not an admin */}
      {!isAdmin && <Booking />}

      {/* Render the Extra component if the user is not an admin */}
      {!isAdmin && <Extra />}

      {/* Render the Footer component */}
      <Footer />
    </div>
  );
};

export default Home;
