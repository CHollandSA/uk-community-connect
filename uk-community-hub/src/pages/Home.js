import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import VolunteeringSection from '../components/VolunteeringSection';
import CitizenshipTestSection from '../components/CitizenshipTestSection';

const Home = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <CitizenshipTestSection />
      <VolunteeringSection />
    </div>
  );
};

export default Home;
