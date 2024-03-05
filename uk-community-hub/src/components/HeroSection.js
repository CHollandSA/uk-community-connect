import React from "react";
import "./Hero.css";
import "./App.css";

export default function HeroSection() {
  return (
    <section className="hero">
      <img
        src="\images\Flag_Of_the_United_Kingdom.png"
        alt="UK"
        className="hero--photo"
      />
      <div>
        <h2 className="hero--header">Information</h2>
      </div>
      <p className="hero--text">
        The "UK Community Connect'' project is a web application designed to
        empower newcomers to the United Kingdom as they pursue citizenship and
        integration into British society. At its core, this project aligns with
        the United Nations Sustainable Development Goal (UNSDG) of "Quality
        Education," focusing on providing educational resources and support to
        those on the path to becoming UK citizens.
      </p>
    </section>
  );
}
