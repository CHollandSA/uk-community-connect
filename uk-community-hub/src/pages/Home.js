import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import VolunteeringSection from '../components/VolunteeringSection';
import CitizenshipTestSection from '../components/CitizenshipTestSection';
import Extra from '../components/Extra';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <CitizenshipTestSection />
      <VolunteeringSection />
      <Extra />
      <Footer/>
    </div>
  );
};

export default Home;
